import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI if key is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Resilient helper to call Gemini with model fallback
async function callGeminiWithFallback(params: {
  contents: string;
  config?: any;
}): Promise<string | null> {
  if (!aiClient) return null;
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  for (const model of models) {
    try {
      const response = await aiClient.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`Model ${model} request failed, attempting next model:`, err?.message || err);
    }
  }
  return null;
}

// System prompt for Grade 4 & 5 Scratch Tutor adhering strictly to SGK Tin học Kết nối tri thức
const TUTOR_SYSTEM_INSTRUCTION = `
Bạn là "Gia sư Scratch AI" (Thầy Mèo AI) – người bạn đồng hành hướng dẫn học sinh lớp 4 và lớp 5 tiểu học Việt Nam (khoảng 9-11 tuổi) học lập trình Scratch theo bộ SGK Tin học 4 và SGK Tin học 5 (Bộ Kết nối tri thức với cuộc sống).

=======================================================
1. VAI TRÒ & NGUYÊN TẮC CỐT LÕI
=======================================================
- Gợi mở ĐÚNG TRỌNG TÂM: Đặt câu hỏi gợi mở CỤ THỂ, ĐÚNG TRỌNG TÂM, liên quan TRỰC TIẾP đến nhiệm vụ mà học sinh đang thực hiện.
- Đọc và hiểu sâu yêu cầu của học sinh trước khi trả lời. Xác định học sinh đang cần giải quyết vấn đề gì, từ đó lựa chọn câu hỏi phù hợp với kiến thức bài học.
- TUYỆT ĐỐI KHÔNG hỏi những câu chung chung, sáo rỗng hoặc lặp lại máy móc như:
  * "Em hãy suy nghĩ cách giải quyết nhé."
  * "Em cần sử dụng các lệnh phù hợp."
  * "Em hãy thử lập trình xem sao."
- MỖI LƯỢT CHỈ ĐẶT 1 CÂU HỎI CHÍNH, ngắn gọn, dễ hiểu, giúp học sinh tự tìm ra bước tiếp theo.
- KHÔNG đưa ngay toàn bộ chương trình hoàn chỉnh khi học sinh chưa yêu cầu lời giải trực tiếp.
- Ngôn ngữ: Tiếng Việt trong sáng, tích cực, khuyến khích học sinh, xưng hô Thầy Mèo - em / bạn nhỏ.

=======================================================
2. NGUỒN KIẾN THỨC & THUẬT NGỮ CHUẨN SGK (BẮT BUỘC)
=======================================================
- Dùng 100% đúng thuật ngữ SGK Tin học 4 & 5 Kết nối tri thức:
  * "cấu trúc tuần tự" (không gọi chạy lần lượt)
  * "cấu trúc lặp"
  * "cấu trúc rẽ nhánh" (dạng thiếu: Nếu – thì, dạng đủ: Nếu – thì – nếu không thì)
  * "biến", "biểu thức"
  * "nhân vật", "sân khấu", "vùng lập trình", "nhóm lệnh", "lệnh", "khối lệnh", "chương trình", "phông nền"
- Nhóm lệnh và màu sắc Scratch:
  * Sự kiện (màu vàng)
  * Chuyển động (màu xanh lam)
  * Hiển thị (màu tím)
  * Âm thanh (màu hồng tím)
  * Điều khiển (màu cam)
  * Cảm biến (màu lục lam)
  * Các phép toán (màu xanh lá)
  * Các biến (màu cam đậm)
- KHÔNG đưa kiến thức nâng cao ngoài SGK vào bài học bắt buộc.

=======================================================
3. QUY TRÌNH TRẢ LỜI 6 BƯỚC
=======================================================
Bước 1. Xác định nhiệm vụ: Hiểu học sinh muốn tạo chương trình gì, nhân vật nào thực hiện, kết quả mong muốn là gì.
Bước 2. Xác định kiến thức cần vận dụng: Chọn đúng kiến thức, thuật ngữ và nhóm lệnh liên quan trong SGK Tin học 4/5.
Bước 3. Đặt câu hỏi gợi mở cụ thể: Mỗi lượt chỉ 1 câu hỏi chính, ngắn gọn, xuất phát từ chính yêu cầu của học sinh.
Bước 4. Phản hồi theo câu trả lời:
  - Nếu trả lời đúng: Khen ngắn gọn, ấm áp rồi đặt câu hỏi tiếp theo.
  - Nếu trả lời chưa đúng: Giải thích bằng ngôn ngữ đơn giản, đưa gợi ý nhỏ hoặc 2-3 lựa chọn để suy nghĩ lại (không chê bai).
Bước 5. Hướng dẫn hoàn thành chương trình: Dẫn dắt lần lượt: nhân vật -> sự kiện bắt đầu -> nhóm lệnh -> thứ tự các lệnh -> số lần thực hiện / điều kiện.
Bước 6. Kiểm tra kết quả: Yêu cầu học sinh chạy thử trên sân khấu (bấm Cờ xanh) và kiểm tra lại.
(Linh hoạt chọn câu hỏi phù hợp, không bắt buộc bài nào cũng hỏi đủ mọi bước nếu vấn đề của học sinh đã rõ ràng).

=======================================================
4. NGUYÊN TẮC ĐIỀU CHỈNH CÂU HỎI THEO CÂU TRẢ LỜI
=======================================================
- Nếu học sinh trả lời đúng: Khen ngắn gọn, chuyển sang bước tiếp theo.
- Nếu học sinh trả lời chưa đúng: Giải thích ngắn gọn và đưa ra một gợi ý nhỏ hoặc đưa 2 lựa chọn gợi ý.
- Nếu học sinh nói "Em không biết" / "Em chưa hiểu": Chia nhiệm vụ thành bước nhỏ hơn, đưa ra 2–3 lựa chọn phù hợp hoặc chỉ dẫn học sinh quan sát nhóm lệnh liên quan (kèm màu sắc).
- Nếu học sinh hỏi "Dùng lệnh nào?": Xác định đúng hành động cần thực hiện rồi gợi ý nhóm lệnh liên quan và tên khối lệnh, không trả lời mơ hồ.
- Nếu học sinh hỏi "Tại sao chương trình không chạy đúng?": Hỏi về kết quả mong muốn, kết quả thực tế và các lệnh đã sử dụng nếu chưa có đủ dữ liệu, rồi hướng dẫn tìm nguyên nhân.
- Nếu học sinh đã thử nhiều lần nhưng vẫn gặp khó khăn: Tăng dần mức độ hỗ trợ, có thể đưa ví dụ minh họa hoặc hướng dẫn từng bước.
- NẾU HỌC SINH YÊU CẦU TRỰC TIẾP LỜI GIẢI HOÀN CHỈNH (như "Cho em đáp án", "Làm hộ em", "Chỉ em toàn bộ code"): Cung cấp lời giải phù hợp với trình độ, giải thích thứ tự các lệnh và khuyến khích học sinh tự chạy thử trên sân khấu.

=======================================================
5. CÁC TÌNH HUỐNG KIỂM TRA MẪU (BẮT BUỘC TUÂN THỦ)
=======================================================
* Tình huống 1: Học sinh muốn vẽ hình tam giác
  - Gợi mở bước 1: "Theo em, hình tam giác có mấy cạnh?"
  - Khi học sinh trả lời 3: "Đúng rồi! Vậy nhân vật chú mèo cần thực hiện thao tác vẽ cạnh mấy lần để tạo đủ 3 cạnh?"
  - Khi học sinh trả lời 3 lần: "Chính xác! Để nhân vật thực hiện một nhóm lệnh nhiều lần, em hãy quan sát nhóm lệnh Điều khiển (màu cam). Trong nhóm này có lệnh nào cho phép lặp lại các thao tác không?"
  - Tiếp theo: "Sau khi vẽ xong một cạnh, nhân vật cần đổi hướng như thế nào để vẽ tiếp cạnh kế tiếp?"
  - Góc quay: Gợi ý góc quay phù hợp để khép kín hình tam giác đều (360 độ chia 3 = xoay 120 độ).
  - Cuối cùng: Yêu cầu ghép lệnh theo thứ tự và chạy thử.

* Tình huống 2: Học sinh muốn nhân vật di chuyển 5 bước liên tiếp
  - Hỏi trực tiếp: "Em muốn nhân vật di chuyển bao nhiêu bước?"
  - "Em hãy tìm lệnh điều khiển chuyển động của nhân vật trong nhóm lệnh Chuyển động (màu xanh lam) nhé! Nếu cần thực hiện cùng một thao tác nhiều lần, em có thể sử dụng cấu trúc nào?"

* Tình huống 3: Học sinh muốn nhân vật nói lời chào khi bấm cờ xanh
  - "Sự kiện nào sẽ bắt đầu chương trình khi em bấm cờ xanh?"
  - "Em cần tìm lệnh trong nhóm lệnh nào để nhân vật nói lời chào? (Gợi ý: nhóm Hiển thị màu tím)."
  - "Theo em, lệnh bắt đầu chương trình [khi bấm vào cờ xanh] cần được đặt trước hay sau lệnh nói lời chào?"

* Tình huống 4: Học sinh muốn sửa chương trình nhưng nhân vật không thực hiện đúng yêu cầu
  - "Em muốn nhân vật thực hiện hành động gì?"
  - "Khi chạy chương trình, nhân vật thực tế đã làm gì?"
  - "Theo em, lệnh nào có thể khiến kết quả khác với yêu cầu?"
`;

// System prompt for 9-step Error Analysis
const ERROR_ANALYSIS_INSTRUCTION = `
Bạn là "Thám tử sửa lỗi Scratch" (Mèo Thám Tử AI) dành cho học sinh Lớp 4 và Lớp 5 Việt Nam.
Bám sát SGK Tin học 4 và Tin học 5 Kết nối tri thức.

KHI PHÂN TÍCH LỖI, BẮT BUỘC TUÂN THỦ TRÌNH TỰ 9 BƯỚC:
1. Yêu cầu của bài toán là gì?
2. Chương trình đang thực hiện như thế nào?
3. Kết quả thực tế là gì?
4. Kết quả mong muốn là gì?
5. Có khả năng sai ở bước nào?
6. Vì sao?
7. Gợi ý sửa (KHÔNG ngay lập tức đưa chương trình hoàn chỉnh):
   - Nếu sai thứ tự lệnh: "Em hãy kiểm tra lại thứ tự thực hiện các lệnh."
   - Nếu thiếu lệnh: "Em hãy xem lại yêu cầu và tìm bước nào chưa được thực hiện."
   - Nếu dùng sai cấu trúc: "Em hãy xem nhiệm vụ này có công việc nào được lặp lại hoặc có điều kiện nào cần kiểm tra không."
8. Cho học sinh tự sửa.
9. Kiểm tra lại.
`;

// Helper fallback responses when API key is missing or offline
function getFallbackTutorResponse(
  message: string,
  grade: number,
  history: any[] = []
): {
  reply: string;
  quickFollowUps: string[];
  presetBlocks?: any[];
  currentStep?: number;
} {
  const lower = message.toLowerCase().trim();

  // Find previous AI message to determine conversation state
  const prevAiMsg = [...history].reverse().find((h) => h.sender === 'ai' || h.sender === 'assistant')?.text?.toLowerCase() || '';

  // 0. If student asks for full answer directly
  if (
    lower.includes('đáp án') ||
    lower.includes('toàn bộ code') ||
    lower.includes('làm hộ em') ||
    lower.includes('cho lời giải') ||
    lower.includes('chỉ em hết') ||
    lower.includes('xem đáp án')
  ) {
    if (lower.includes('tam giác') || prevAiMsg.includes('tam giác')) {
      return {
        reply: `Thầy Mèo gửi em chương trình hoàn chỉnh để vẽ hình tam giác đều trên sân khấu nhé! 🐱📐

Các khối lệnh theo đúng thứ tự logic:
1. \`[khi bấm vào 🟩]\` (Nhóm Sự kiện - màu vàng)
2. \`[lặp lại 3 lần]\` (Nhóm Điều khiển - màu cam):
   - Bên trong: \`[di chuyển 100 bước]\` (Nhóm Chuyển động - màu xanh lam)
   - Bên trong: \`[xoay phải 120 độ]\` (Nhóm Chuyển động - màu xanh lam, vì 360° : 3 = 120°)

👉 Em hãy bấm nút **"Mở Sân Khấu Thử Nghiệm"** bên dưới để nạp các khối lệnh này và chạy thử xem chú Mèo vẽ tam giác nhé!`,
        quickFollowUps: ['Mở Sân Khấu chạy thử', 'Nếu vẽ hình vuông thì góc xoay bao nhiêu?', 'Thầy giải thích tại sao lại xoay 120 độ?'],
        presetBlocks: [
          { id: 'tb-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
          { id: 'tb-2', category: 'control', text: 'lặp lại 3 lần', shape: 'c-block', actionType: 'repeat' },
          { id: 'tb-3', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' },
          { id: 'tb-4', category: 'motion', text: 'xoay ↻ 15 độ', shape: 'stack', actionType: 'turnRight' }
        ],
        currentStep: 5
      };
    }

    if (lower.includes('5 bước') || prevAiMsg.includes('5 bước')) {
      return {
        reply: `Thầy Mèo gửi em chương trình hoàn chỉnh để nhân vật di chuyển 5 bước liên tiếp nhé: 🐱🚶

Các khối lệnh theo thứ tự:
1. \`[khi bấm vào 🟩]\` (Nhóm Sự kiện - màu vàng)
2. \`[lặp lại 5 lần]\` (Nhóm Điều khiển - màu cam):
   - Bên trong: \`[di chuyển 15 bước]\` (Nhóm Chuyển động - màu xanh lam)

👉 Em hãy bấm nút **"Mở Sân Khấu Thử Nghiệm"** để chạy thử xem chú Mèo bước đi nhé!`,
        quickFollowUps: ['Mở Sân Khấu chạy thử', 'Làm sao để mèo đi lùi?', 'Thêm âm thanh Meow khi đi'],
        presetBlocks: [
          { id: 'sb-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
          { id: 'sb-2', category: 'control', text: 'lặp lại (5) lần', shape: 'c-block', actionType: 'repeat' },
          { id: 'sb-3', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' }
        ],
        currentStep: 5
      };
    }

    return {
      reply: `Thầy Mèo gửi em cấu trúc chương trình chuẩn theo SGK Tin học ${grade} nhé:
1. Khối lệnh bắt đầu: \`[khi bấm vào 🟩]\` (Nhóm Sự kiện - màu vàng)
2. Các khối lệnh hành động: chọn từ nhóm **Chuyển động (xanh lam)** hoặc **Hiển thị (tím)** ghép nối tiếp từ trên xuống dưới.
3. Nếu cần lặp lại nhiều lần: dùng khối \`[lặp lại ... lần]\` trong nhóm **Điều khiển (màu cam)**.

👉 Em hãy bấm nút **"Mở Sân Khấu Thử Nghiệm"** để kéo ghép các lệnh và bấm Cờ xanh kiểm tra nhé!`,
      quickFollowUps: ['Mở Sân Khấu chạy thử', 'Em muốn làm bài khác', 'Thầy hướng dẫn từng bước'],
      currentStep: 5
    };
  }

  // TÌNH HUỐNG 1: VẼ HÌNH TAM GIÁC
  const isTriangleContext = lower.includes('tam giác') || prevAiMsg.includes('tam giác') || prevAiMsg.includes('mấy cạnh') || prevAiMsg.includes('mấy lần để tạo đủ 3 cạnh') || prevAiMsg.includes('góc xoay');

  if (isTriangleContext) {
    // Step 1 check: Answer about number of sides
    if (prevAiMsg.includes('mấy cạnh') || lower === '3' || lower.includes('3 cạnh') || lower.includes('ba cạnh') || lower.includes('có 3 cạnh')) {
      return {
        reply: `Đúng rồi! 🌟 Hình tam giác có đúng 3 cạnh.
Vậy nhân vật chú mèo cần thực hiện thao tác vẽ cạnh mấy lần để tạo đủ 3 cạnh?`,
        quickFollowUps: ['Cần thực hiện 3 lần', 'Chỉ 1 lần thôi', 'Em chưa biết'],
        currentStep: 2
      };
    }

    // Step 2 check: Answer about repetitions
    if (prevAiMsg.includes('mấy lần để tạo đủ 3 cạnh') || lower.includes('3 lần') || lower.includes('ba lần')) {
      return {
        reply: `Chính xác! 👏 Để nhân vật thực hiện một nhóm lệnh nhiều lần, em nghĩ mình nên tìm lệnh trong nhóm lệnh nào?
(Gợi ý: Em hãy quan sát nhóm lệnh **Điều khiển (màu cam)**. Trong nhóm này có lệnh nào cho phép lặp lại các thao tác không?)`,
        quickFollowUps: ['Nhóm Điều khiển (màu cam)', 'Lệnh [lặp lại ... lần]', 'Em chưa biết'],
        currentStep: 3
      };
    }

    // Step 3 check: Answer about Control / Repeat block
    if (prevAiMsg.includes('điều khiển') || lower.includes('điều khiển') || lower.includes('lặp lại') || lower.includes('cam')) {
      return {
        reply: `Rất giỏi! Đó là khối lệnh \`[lặp lại [3] lần]\` trong nhóm **Điều khiển (màu cam)**.
Sau khi vẽ xong một cạnh, nhân vật cần đổi hướng như thế nào để vẽ tiếp cạnh kế tiếp?
(Gợi ý: Em hãy thử tính xem: một vòng tròn khép kín là 360 độ, để khép kín hình tam giác đều thì góc quay là: 360 độ : 3 cạnh = bao nhiêu độ nhỉ?)`,
        quickFollowUps: ['Xoay 120 độ', 'Xoay 90 độ', 'Xoay 60 độ'],
        currentStep: 4
      };
    }

    // Step 4 check: Answer about turn angle
    if (prevAiMsg.includes('bao nhiêu độ') || lower.includes('120') || lower.includes('120 độ') || lower.includes('xoay 120')) {
      return {
        reply: `Xuất sắc! 🎉 Góc quay ngoài chính là 120 độ (vì 360 : 3 = 120 độ).
Cuối cùng, em hãy ghép các lệnh theo đúng thứ tự:
1. Gắn khối \`[khi bấm vào 🟩]\` lên trên cùng.
2. Dùng khối \`[lặp lại 3 lần]\` (nhóm Điều khiển - cam).
3. Đặt lệnh \`[di chuyển 100 bước]\` và \`[xoay phải 120 độ]\` vào bên trong khối lặp lại.

👉 Em hãy bấm nút **"Mở Sân Khấu Thử Nghiệm"** để chạy thử xem chú Mèo vẽ tam giác đẹp thế nào nhé!`,
        quickFollowUps: ['Mở Sân Khấu chạy thử', 'Nếu vẽ hình vuông thì góc xoay bao nhiêu?', 'Em đã hoàn thành!'],
        presetBlocks: [
          { id: 'tb-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
          { id: 'tb-2', category: 'control', text: 'lặp lại 3 lần', shape: 'c-block', actionType: 'repeat' },
          { id: 'tb-3', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' },
          { id: 'tb-4', category: 'motion', text: 'xoay ↻ 15 độ', shape: 'stack', actionType: 'turnRight' }
        ],
        currentStep: 6
      };
    }

    // Initial question for Triangle
    return {
      reply: `Chào bạn nhỏ lớp ${grade}! Thầy Mèo rất vui được đồng hành cùng em vẽ hình tam giác! 🐱📐
Để lập trình cho chú Mèo vẽ một hình tam giác, chúng mình cùng suy nghĩ từng bước nhé:
Theo em, hình tam giác có mấy cạnh?`,
      quickFollowUps: ['Có 3 cạnh', 'Có 4 cạnh', 'Em chưa rõ'],
      currentStep: 1
    };
  }

  // TÌNH HUỐNG 2: DI CHUYỂN 5 BƯỚC LIÊN TIẾP
  const is5StepsContext = lower.includes('5 bước') || lower.includes('liên tiếp') || (lower.includes('di chuyển') && lower.includes('liên')) || prevAiMsg.includes('5 bước');

  if (is5StepsContext) {
    if (prevAiMsg.includes('bao nhiêu bước') || lower.includes('5 bước') || lower.includes('cấu trúc lặp') || lower.includes('lặp lại') || lower.includes('chuyển động')) {
      return {
        reply: `Rất chính xác! 🌟
1. Để nhân vật di chuyển: dùng lệnh \`[di chuyển 15 bước]\` trong nhóm **Chuyển động (màu xanh lam)**.
2. Để lặp lại thao tác nhiều lần liên tục: dùng **cấu trúc lặp** với khối lệnh \`[lặp lại 5 lần]\` trong nhóm **Điều khiển (màu cam)**.
3. Đặt lệnh di chuyển vào bên trong khối lặp lại, và gắn khối Sự kiện \`[khi bấm vào 🟩]\` lên trên cùng!

👉 Em hãy bấm nút **"Mở Sân Khấu Thử Nghiệm"** để ghép lệnh và bấm Cờ xanh kiểm tra nhé!`,
        quickFollowUps: ['Mở Sân Khấu chạy thử', 'Thêm lệnh đợi giữa các bước', 'Em đã làm được rồi!'],
        presetBlocks: [
          { id: 'sb-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
          { id: 'sb-2', category: 'control', text: 'lặp lại (5) lần', shape: 'c-block', actionType: 'repeat' },
          { id: 'sb-3', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' }
        ],
        currentStep: 5
      };
    }

    return {
      reply: `Chào em! Thầy Mèo sẽ hướng dẫn em lập trình di chuyển từng bước nhé! 🐱🚶
Em muốn nhân vật di chuyển bao nhiêu bước?
Em hãy tìm lệnh điều khiển chuyển động của nhân vật trong nhóm lệnh **Chuyển động (màu xanh lam)** nhé! Nếu cần thực hiện cùng một thao tác nhiều lần liên tục, em có thể sử dụng cấu trúc nào?`,
      quickFollowUps: ['Di chuyển 5 bước', 'Sử dụng cấu trúc lặp', 'Em chưa biết dùng lệnh nào'],
      currentStep: 1
    };
  }

  // TÌNH HUỐNG 3: NÓI LỜI CHÀO KHI BẤM CỜ XANH
  const isGreetingContext = lower.includes('chào') || lower.includes('lời chào') || prevAiMsg.includes('lời chào') || prevAiMsg.includes('bấm cờ xanh');

  if (isGreetingContext) {
    if (prevAiMsg.includes('đặt trước hay sau')) {
      if (lower.includes('trước') || lower.includes('trên') || lower.includes('đầu')) {
        return {
          reply: `Tuyệt vời! 👏 Trong cấu trúc tuần tự, máy tính luôn thực hiện các lệnh từ trên xuống dưới, nên khối mũ Sự kiện \`[khi bấm vào 🟩]\` luôn phải đặt trước (ở trên cùng).
Bây giờ, em hãy gắn khối \`[nói Xin chào! trong 2 giây]\` vào ngay bên dưới khối cờ xanh.

👉 Em hãy bấm nút **"Mở Sân Khấu Thử Nghiệm"** và bấm Cờ xanh xem bóng thoại lời chào của chú Mèo nhé!`,
          quickFollowUps: ['Mở Sân Khấu chạy thử', 'Đổi lời chào thành câu khác', 'Thêm tiếng kêu Meow'],
          presetBlocks: [
            { id: 'gb-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
            { id: 'gb-2', category: 'looks', text: 'nói "Xin chào bạn nhỏ!" trong 2 giây', shape: 'stack', actionType: 'say' }
          ],
          currentStep: 6
        };
      } else {
        return {
          reply: `Em hãy suy nghĩ lại một chút nhé: Máy tính đọc lệnh từ trên xuống dưới như em đọc một trang sách.
Nếu không có khối lệnh Sự kiện ở trên cùng để phát tín hiệu bắt đầu thì chương trình có biết khi nào cần nói lời chào không?
Vậy lệnh \`[khi bấm vào 🟩]\` cần đặt trước hay đặt sau?`,
          quickFollowUps: ['Cần đặt trước (trên cùng)', 'Đặt sau', 'Em hiểu rồi'],
          currentStep: 4
        };
      }
    }

    if (prevAiMsg.includes('nhóm lệnh nào') || lower.includes('cờ xanh') || lower.includes('hiển thị') || lower.includes('sự kiện') || lower.includes('tím')) {
      return {
        reply: `Chính xác rồi! 🌟 Khối lệnh bắt đầu là \`[khi bấm vào 🟩]\` trong nhóm **Sự kiện (màu vàng)** và khối lệnh nói là \`[nói Xin chào! trong 2 giây]\` trong nhóm **Hiển thị (màu tím)**.
Theo em, lệnh bắt đầu chương trình \`[khi bấm vào 🟩]\` cần được đặt trước hay sau lệnh nói lời chào?`,
        quickFollowUps: ['Đặt trước (trên cùng)', 'Đặt sau', 'Em chưa rõ'],
        currentStep: 3
      };
    }

    return {
      reply: `Chào bạn nhỏ! Để chú Mèo nói lời chào thân thiện khi bấm cờ xanh: 🐱💬
Sự kiện nào sẽ bắt đầu chương trình khi em bấm cờ xanh?
Em cần tìm lệnh trong nhóm lệnh nào để nhân vật nói lời chào? (Gợi ý: nhóm **Hiển thị màu tím** nhé!)`,
      quickFollowUps: ['Khi bấm vào cờ xanh', 'Nhóm Hiển thị (màu tím)', 'Em chưa biết'],
      currentStep: 1
    };
  }

  // TÌNH HUỐNG 4: SỬA CHƯƠNG TRÌNH / KHÔNG THỰC HIỆN ĐÚNG
  const isDebugContext = lower.includes('không chạy đúng') || lower.includes('bị lỗi') || lower.includes('sửa lỗi') || lower.includes('sửa chương trình') || lower.includes('đứng yên') || lower.includes('tại sao') || lower.includes('không đúng') || prevAiMsg.includes('thực tế đã làm gì');

  if (isDebugContext) {
    if (prevAiMsg.includes('thực tế đã làm gì') || lower.includes('đứng yên') || lower.includes('không di chuyển') || lower.includes('ngược') || lower.includes('sai')) {
      return {
        reply: `Thầy đã hiểu nguyên nhân rồi! 💡
Để sửa lỗi này, em hãy kiểm tra lại 3 bước sau nhé:
1. Em đã gắn khối lệnh Sự kiện \`[khi bấm vào 🟩]\` lên trên cùng chưa? (Nếu thiếu khối này, nhân vật sẽ đứng yên khi bấm cờ xanh).
2. Thứ tự các khối lệnh đã đúng từ trên xuống dưới chưa?
3. Các thông số (số bước, góc xoay, số lần lặp) đã được điền chính xác chưa?

👉 Em hãy kiểm tra lại và bấm Cờ xanh trên Sân khấu để xem chú Mèo đã hoạt động đúng chưa nhé!`,
        quickFollowUps: ['Mở Sân Khấu kiểm tra', 'Đã gắn cờ xanh nhưng vẫn đứng yên', 'Em đã sửa được rồi!'],
        currentStep: 5
      };
    }

    return {
      reply: `Thầy Mèo sẵn sàng cùng em làm thám tử tìm nguyên nhân rồi đây! 🕵️‍♂️
Em hãy cho thầy biết:
1. Em muốn nhân vật thực hiện hành động gì?
2. Khi chạy chương trình, nhân vật thực tế đã làm gì?
3. Theo em, lệnh nào có thể khiến kết quả khác với yêu cầu?`,
      quickFollowUps: ['Nhân vật đứng yên không chạy', 'Nhân vật quay sai hướng', 'Thứ tự các lệnh bị đảo lộn'],
      currentStep: 1
    };
  }

  // TRẢ LỜI "EM KHÔNG BIẾT" / "CHƯA HIỂU"
  if (lower.includes('không biết') || lower.includes('chưa biết') || lower.includes('chưa hiểu') || lower.includes('khó quá')) {
    return {
      reply: `Đừng lo lắng nhé, Thầy Mèo sẽ chia nhỏ nhiệm vụ thành bước thật đơn giản cho em! 🌟
Em hãy chọn một trong các hành động sau:
A) Cho chú Mèo di chuyển bước đi (nhóm **Chuyển động** màu xanh lam)
B) Cho chú Mèo nói chuyện bằng bóng thoại (nhóm **Hiển thị** màu tím)
C) Cho chú Mèo lặp lại một hành động nhiều lần (nhóm **Điều khiển** màu cam)

Em muốn thực hiện hành động nào trước?`,
      quickFollowUps: ['Cho chú Mèo di chuyển', 'Cho chú Mèo nói chuyện', 'Lặp lại hành động'],
      currentStep: 2
    };
  }

  // HỌC SINH HỎI "DÙNG LỆNH NÀO?"
  if (lower.includes('dùng lệnh nào') || lower.includes('lệnh gì') || lower.includes('chọn lệnh nào')) {
    return {
      reply: `Để thầy gợi ý cụ thể nhóm lệnh và khối lệnh cho em nhé: 🧩
- Nếu muốn nhân vật **đi lại**: dùng lệnh \`[di chuyển ... bước]\` trong nhóm **Chuyển động (màu xanh lam)**.
- Nếu muốn nhân vật **nói chuyện**: dùng lệnh \`[nói ... trong ... giây]\` trong nhóm **Hiển thị (màu tím)**.
- Nếu muốn **lặp lại nhiều lần**: dùng lệnh \`[lặp lại ... lần]\` trong nhóm **Điều khiển (màu cam)**.
- Nếu muốn **bắt đầu khi bấm Cờ xanh**: dùng lệnh \`[khi bấm vào 🟩]\` trong nhóm **Sự kiện (màu vàng)**.

Hiện tại em đang muốn nhân vật thực hiện hành động nào trước tiên?`,
      quickFollowUps: ['Lệnh di chuyển', 'Lệnh nói chuyện', 'Lệnh lặp lại'],
      currentStep: 2
    };
  }

  // TRÒ CHƠI HỨNG TÁO / BIẾN & ĐIỂM SỐ
  if (lower.includes('táo') || lower.includes('chạm') || lower.includes('điểm') || lower.includes('biến')) {
    return {
      reply: `Ý tưởng làm trò chơi tính điểm của em rất tuyệt vời! 🍎🏆
Theo SGK Tin học 5:
1. Để lưu trữ điểm số, ta dùng một **Biến** tên là "Điểm" trong nhóm **Các biến (màu cam đậm)**.
2. Lúc bắt đầu trò chơi, ta dùng lệnh \`[đặt [Điểm] thành 0]\`.
3. Khi chén hứng chạm quả táo, ta dùng cấu trúc rẽ nhánh: khối \`[nếu <chạm Quả táo?> thì]\` để \`[thay đổi [Điểm] một lượng 1]\`.

Theo em, lúc mới bắt đầu chơi thì Điểm số cần được đặt bằng bao nhiêu trước tiên?`,
      quickFollowUps: ['Đặt Điểm thành 0', 'Tăng điểm khi chạm', 'Em chưa biết cách tạo Biến'],
      presetBlocks: [
        { id: 'ab-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
        { id: 'ab-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack', actionType: 'setScore' },
        { id: 'ab-3', category: 'control', text: 'lặp lại (5) lần', shape: 'c-block', actionType: 'repeat' },
        { id: 'ab-4', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack', actionType: 'changeScore' }
      ],
      currentStep: 2
    };
  }

  // Default friendly Socratic inquiry
  return {
    reply: `Chào bạn nhỏ lớp ${grade}! Thầy Mèo Scratch đã lắng nghe rõ yêu cầu của em rồi! 🐱✨
Để giúp em lập trình đúng theo yêu cầu này, em hãy cho Thầy Mèo biết:
Nhân vật nào sẽ thực hiện hành động này và em muốn hành động đó bắt đầu khi nào (bấm Cờ xanh hay bấm phím)?`,
    quickFollowUps: ['Khi bấm vào Cờ xanh', 'Khi bấm phím mũi tên', 'Em muốn chú Mèo thực hiện'],
    currentStep: 1
  };
}

// Helper fallback for 9-step error analysis
function getFallbackErrorAnalysis(description: string): {
  taskGoal: string;
  howRunning: string;
  actualResult: string;
  expectedResult: string;
  whereStepWrong: string;
  whyWrong: string;
  hintFix: string;
  selfFixTask: string;
  verifyGuide: string;
  problem: string;
  reason: string;
  hint: string;
  fullGuide: string;
} {
  const lower = description.toLowerCase();
  if (lower.includes('thứ tự') || lower.includes('ngược') || lower.includes('trước sau')) {
    return {
      taskGoal: 'Thực hiện các hành động theo đúng trình tự câu chuyện hoặc kịch bản đề ra.',
      howRunning: 'Chương trình đang thực hiện lệnh bên dưới trước lệnh bên trên hoặc hoán đổi vị trí.',
      actualResult: 'Nhân vật làm hành động sau trước, hành động trước sau (ví dụ đi trước rồi mới nói chào).',
      expectedResult: 'Nhân vật thực hiện theo đúng thứ tự logic tự nhiên (nói chào trước rồi mới bước đi).',
      whereStepWrong: 'Ở vị trí ghép nối giữa hai khối lệnh hành động trong vùng lập trình.',
      whyWrong: 'Máy tính luôn thực hiện các lệnh tuần tự từ trên xuống dưới một cách tuyệt đối.',
      hintFix: 'Em hãy kiểm tra lại thứ tự thực hiện các lệnh: lệnh nào cần làm trước phải đặt ở trên.',
      selfFixTask: 'Tháo hai khối lệnh ra và đổi vị trí cho nhau rồi gắn khít lại.',
      verifyGuide: 'Bấm Cờ xanh và quan sát xem chú Mèo đã làm theo đúng thứ tự chưa nhé!',
      problem: 'Sai thứ tự thực hiện các khối lệnh.',
      reason: 'Các khối lệnh bị đảo lộn vị trí từ trên xuống dưới.',
      hint: 'Em hãy kiểm tra lại thứ tự thực hiện các lệnh.',
      fullGuide: 'Tách rời khối lệnh ở vị trí sai và đảo lại trật tự theo đúng kịch bản.'
    };
  }

  if (lower.includes('không di chuyển') || lower.includes('đứng yên') || lower.includes('không chạy') || lower.includes('cờ xanh')) {
    return {
      taskGoal: 'Khởi động chương trình và cho nhân vật thực hiện hành động khi bấm Cờ xanh.',
      howRunning: 'Các khối lệnh hành động nằm trơ trọi trong vùng lập trình mà chưa có khối lệnh sự kiện bắt đầu.',
      actualResult: 'Khi bấm Cờ xanh trên sân khấu, nhân vật đứng yên như tượng.',
      expectedResult: 'Khi bấm Cờ xanh, nhân vật lập tức thực hiện các hành động đã được lập trình.',
      whereStepWrong: 'Ở vị trí đầu tiên trên cùng của kịch bản chương trình.',
      whyWrong: 'Máy tính cần một khối lệnh Sự kiện (chiếc mũ cờ xanh) làm đầu tàu để kích hoạt chương trình.',
      hintFix: 'Em hãy xem lại yêu cầu và tìm bước nào chưa được thực hiện: Em đã gắn chiếc mũ Sự kiện màu vàng chưa?',
      selfFixTask: 'Vào nhóm Sự kiện (màu vàng), kéo khối [khi bấm vào cờ xanh] gắn vào trên cùng.',
      verifyGuide: 'Bấm lại Cờ xanh ở góc trên sân khấu để kiểm tra chú Mèo nhé!',
      problem: 'Chương trình chưa có khối lệnh Sự kiện bắt đầu.',
      reason: 'Thiếu khối [khi bấm vào cờ xanh] ở đầu chương trình.',
      hint: 'Em hãy xem lại yêu cầu và tìm bước nào chưa được thực hiện.',
      fullGuide: 'Kéo khối [khi bấm vào cờ xanh] từ nhóm Sự kiện và gắn vào trên cùng.'
    };
  }

  return {
    taskGoal: 'Điều khiển nhân vật thực hiện đúng theo yêu cầu của bài toán lập trình.',
    howRunning: 'Chương trình đang thực hiện chưa đúng theo kịch bản mong đợi.',
    actualResult: 'Kết quả chạy thực tế khác với yêu cầu đề bài.',
    expectedResult: 'Nhân vật hoạt động chính xác và đạt kết quả mong muốn.',
    whereStepWrong: 'Ở bước lựa chọn cấu trúc điều khiển hoặc khối lệnh.',
    whyWrong: 'Có thể do thứ tự lệnh bị đảo lộn, thiếu lệnh hoặc dùng chưa đúng cấu trúc điều khiển.',
    hintFix: 'Em hãy xem nhiệm vụ này có công việc nào được lặp lại hoặc có điều kiện nào cần kiểm tra không.',
    selfFixTask: 'Đọc lại từng lệnh từ trên xuống dưới như đọc một câu chuyện ngắn và tự sửa từng bước.',
    verifyGuide: 'Bấm Cờ xanh trên sân khấu để chạy thử và kiểm tra lại sau mỗi lần sửa.',
    problem: 'Chương trình chưa hoạt động đúng theo ý muốn của em.',
    reason: 'Chưa sử dụng đúng thứ tự lệnh hoặc cấu trúc điều khiển phù hợp.',
    hint: 'Em hãy xem nhiệm vụ này có công việc nào được lặp lại hoặc có điều kiện nào cần kiểm tra không.',
    fullGuide: 'Kiểm tra kỹ từng khối lệnh theo quy trình 9 bước của Thám tử sửa lỗi.'
  };
}

// POST /api/tutor
app.post('/api/tutor', async (req, res) => {
  try {
    const { message, grade = 4, history = [], lessonContext = '' } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Tin nhắn không hợp lệ' });
    }

    const fallbackData = getFallbackTutorResponse(message, grade, history);

    if (!aiClient) {
      return res.json({
        reply: fallbackData.reply,
        quickFollowUps: fallbackData.quickFollowUps,
        presetBlocks: fallbackData.presetBlocks,
        currentStep: fallbackData.currentStep,
        source: 'smart_local_tutor'
      });
    }

    const conversationContext = history
      .slice(-6)
      .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Học sinh' : 'Thầy Mèo AI'}: ${h.text}`)
      .join('\n');

    const prompt = `Đối tượng: Học sinh Lớp ${grade} tiểu học Việt Nam (khoảng ${grade === 4 ? 9 : 10} tuổi).
Bài học / Ngữ cảnh hiện tại: ${lessonContext || `Lập trình Scratch cơ bản Lớp ${grade}`}

Lịch sử trò chuyện trước đó (hãy nối tiếp mạch đối thoại này, không hỏi lại những gì học sinh đã trả lời):
${conversationContext || '(Bắt đầu nhiệm vụ mới)'}

Câu nói / câu hỏi mới của học sinh: "${message}"

YÊU CẦU BẮT BUỘC KHI TRẢ LỜI:
1. Đọc và hiểu kỹ nhiệm vụ cụ thể mà học sinh đang thực hiện.
2. Xác định kiến thức SGK Tin học ${grade} và nhóm lệnh Scratch liên quan trực tiếp.
3. MỖI LƯỢT CHỈ ĐẶT ĐÚNG 1 CÂU HỎI CHÍNH, ngắn gọn, dễ hiểu, bám sát bước tiếp theo.
4. TUYỆT ĐỐI KHÔNG hỏi chung chung máy móc (như "Em hãy suy nghĩ...", "Em cần dùng lệnh phù hợp...").
5. Nếu học sinh trả lời đúng: khen ngắn gọn rồi hỏi bước tiếp theo.
6. Nếu học sinh trả lời chưa đúng hoặc nói "Em không biết": đưa ra gợi ý nhỏ hoặc 2-3 lựa chọn cụ thể (kèm nhóm lệnh và màu sắc).
7. Nếu học sinh yêu cầu trực tiếp lời giải / đáp án hoàn chỉnh: cung cấp chương trình hoàn chỉnh rõ ràng, giải thích thứ tự các khối lệnh và bảo học sinh nạp vào sân khấu để chạy thử!
8. Giữ phong thái Thầy Mèo Scratch thân thiện, ấm áp, tích cực.`;

    const generatedText = await callGeminiWithFallback({
      contents: prompt,
      config: {
        systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
        temperature: 0.6,
        maxOutputTokens: 800,
      },
    });

    return res.json({
      reply: generatedText || fallbackData.reply,
      quickFollowUps: fallbackData.quickFollowUps,
      presetBlocks: fallbackData.presetBlocks,
      currentStep: fallbackData.currentStep,
      source: generatedText ? 'gemini' : 'smart_local_tutor'
    });
  } catch (error: any) {
    console.error('Tutor error:', error);
    const fallbackData = getFallbackTutorResponse(req.body.message || '', req.body.grade || 4, req.body.history || []);
    return res.json({
      reply: fallbackData.reply,
      quickFollowUps: fallbackData.quickFollowUps,
      presetBlocks: fallbackData.presetBlocks,
      currentStep: fallbackData.currentStep,
      source: 'smart_local_tutor'
    });
  }
});

// POST /api/analyze-error
app.post('/api/analyze-error', async (req, res) => {
  try {
    const { errorDescription = '', codeBlocks = [], grade = 4 } = req.body;

    if (!aiClient) {
      const analysis = getFallbackErrorAnalysis(errorDescription);
      return res.json({ analysis, source: 'smart_local_debugger' });
    }

    const prompt = `Học sinh lớp ${grade} tiểu học gặp lỗi trong Scratch.
Mô tả lỗi của học sinh: "${errorDescription}"
Các khối lệnh học sinh đang dùng (nếu có): ${JSON.stringify(codeBlocks)}

Hãy phân tích lỗi theo đúng 9 BƯỚC SƯ PHẠM SGK Tin học (JSON thuần túy):
{
  "taskGoal": "1. Yêu cầu của bài toán là gì?",
  "howRunning": "2. Chương trình đang thực hiện như thế nào?",
  "actualResult": "3. Kết quả thực tế là gì?",
  "expectedResult": "4. Kết quả mong muốn là gì?",
  "whereStepWrong": "5. Có khả năng sai ở bước nào?",
  "whyWrong": "6. Vì sao?",
  "hintFix": "7. Gợi ý sửa (nhắc học sinh kiểm tra thứ tự, thiếu lệnh hay cấu trúc, KHÔNG đưa ngay toàn bộ code hoàn chỉnh)",
  "selfFixTask": "8. Nhiệm vụ nhỏ để học sinh tự tay sửa",
  "verifyGuide": "9. Hướng dẫn học sinh bấm Cờ xanh kiểm tra lại trên sân khấu",
  "problem": "Tóm tắt vấn đề ngắn gọn",
  "reason": "Nguyên nhân chính",
  "hint": "Gợi ý suy nghĩ",
  "fullGuide": "Hướng dẫn chi tiết từng khối lệnh nếu học sinh vẫn chưa sửa được"
}
Chỉ trả về JSON thuần túy, không có định dạng markdown xung quanh.`;

    const generatedJson = await callGeminiWithFallback({
      contents: prompt,
      config: {
        systemInstruction: ERROR_ANALYSIS_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    let analysis;
    try {
      analysis = JSON.parse(generatedJson || '{}');
    } catch {
      analysis = getFallbackErrorAnalysis(errorDescription);
    }

    return res.json({ analysis, source: 'gemini' });
  } catch (error: any) {
    console.error('Error analysis error:', error);
    const analysis = getFallbackErrorAnalysis(req.body.errorDescription || '');
    return res.json({ analysis, source: 'smart_local_debugger' });
  }
});

// POST /api/project-planner
app.post('/api/project-planner', async (req, res) => {
  try {
    const { idea = '', grade = 4 } = req.body;
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'Ý tưởng không hợp lệ' });
    }

    if (!aiClient) {
      const fallbackPlan = {
        title: `Dự án: ${idea.slice(0, 40)}`,
        objective: `Học sinh tự xây dựng dự án "${idea.slice(0, 40)}" theo các bước phân tích logic.`,
        characters: ['Nhân vật chính (Ví dụ: Chú mèo Scratch hoặc tự vẽ)', 'Nhân vật phụ / Đồ vật tương tác'],
        background: 'Phông nền phù hợp với chủ đề dự án (ví dụ: Sân trường hoặc Bãi cỏ)',
        requiredBlocks: ['khi bấm vào cờ xanh', 'liên tục', 'nếu ... thì', 'di chuyển 10 bước'],
        algorithm: [
          'Bước 1: Khởi động chương trình khi bấm cờ xanh.',
          'Bước 2: Đặt vị trí xuất phát cho nhân vật.',
          'Bước 3: Lập trình hành động chính (chạy, nói, hoặc tính điểm).',
          'Bước 4: Kiểm tra điều kiện hoàn thành hoặc kết thúc game.'
        ],
        steps: [
          'Chọn nhân vật và phông nền thích hợp.',
          'Lập trình điều khiển nhân vật chính.',
          'Thêm âm thanh hoặc hiệu ứng hình ảnh.',
          'Chạy thử và sửa lỗi.'
        ],
        miniTasks: [
          'Nhiệm vụ 1: Làm cho nhân vật nói lời chào mở đầu.',
          'Nhiệm vụ 2: Làm cho nhân vật di chuyển theo phím bấm hoặc tự động.',
          'Nhiệm vụ 3: Thêm điều kiện hoặc biến số điểm.'
        ]
      };
      return res.json({ plan: fallbackPlan, source: 'smart_local_planner' });
    }

    const prompt = `Học sinh lớp ${grade} tiểu học Việt Nam (9-11 tuổi) có ý tưởng dự án Scratch sau:
"${idea}"

Hãy phân tích ý tưởng này thành kế hoạch dự án sư phạm từng bước. KHÔNG LÀM HỘ TOÀN BỘ CODE.
Trả về định dạng JSON thuần túy:
{
  "title": "Tên dự án hấp dẫn, ngắn gọn",
  "objective": "Mục tiêu bài học",
  "characters": ["Tên nhân vật 1", "Tên nhân vật 2"],
  "background": "Gợi ý phông nền",
  "requiredBlocks": ["khi bấm vào cờ xanh", "khối 2", "khối 3"],
  "algorithm": ["Bước 1...", "Bước 2...", "Bước 3..."],
  "steps": ["Hướng dẫn 1...", "Hướng dẫn 2...", "Hướng dẫn 3..."],
  "miniTasks": ["Nhiệm vụ nhỏ 1 để học sinh tự làm", "Nhiệm vụ nhỏ 2", "Nhiệm vụ nhỏ 3"]
}`;

    const generatedJson = await callGeminiWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    let plan;
    try {
      plan = JSON.parse(generatedJson || '{}');
    } catch {
      plan = {
        title: `Dự án sáng tạo: ${idea.slice(0, 30)}`,
        objective: 'Thực hành lập trình Scratch theo ý tưởng',
        characters: ['Chú Mèo Scratch'],
        background: 'Tự chọn',
        requiredBlocks: ['khi bấm vào cờ xanh'],
        algorithm: ['Khởi động', 'Hành động', 'Kết thúc'],
        steps: ['Tạo nhân vật', 'Gắn lệnh', 'Chạy thử'],
        miniTasks: ['Làm nhân vật di chuyển', 'Thêm âm thanh']
      };
    }

    return res.json({ plan, source: 'gemini' });
  } catch (error) {
    console.error('Project planner error:', error);
    const fallbackPlan = {
      title: `Dự án: ${(req.body.idea || 'Lập trình sáng tạo').slice(0, 40)}`,
      objective: `Học sinh tự xây dựng dự án theo các bước phân tích logic phù hợp lớp ${req.body.grade || 4}.`,
      characters: ['Nhân vật chính (Ví dụ: Chú mèo Scratch hoặc tự vẽ)', 'Nhân vật phụ / Đồ vật tương tác'],
      background: 'Phông nền phù hợp với chủ đề dự án (ví dụ: Sân trường hoặc Bãi cỏ)',
      requiredBlocks: ['khi bấm vào cờ xanh', 'liên tục', 'nếu ... thì', 'di chuyển 10 bước'],
      algorithm: [
        'Bước 1: Khởi động chương trình khi bấm cờ xanh.',
        'Bước 2: Đặt vị trí xuất phát cho nhân vật.',
        'Bước 3: Lập trình hành động chính (chạy, nói, hoặc tính điểm).',
        'Bước 4: Kiểm tra điều kiện hoàn thành hoặc kết thúc game.'
      ],
      steps: [
        'Chọn nhân vật và phông nền thích hợp.',
        'Lập trình điều khiển nhân vật chính.',
        'Thêm âm thanh hoặc hiệu ứng hình ảnh.',
        'Chạy thử và sửa lỗi.'
      ],
      miniTasks: [
        'Nhiệm vụ 1: Làm cho nhân vật nói lời chào mở đầu.',
        'Nhiệm vụ 2: Làm cho nhân vật di chuyển theo phím bấm hoặc tự động.',
        'Nhiệm vụ 3: Thêm điều kiện hoặc biến số điểm.'
      ]
    };
    return res.json({ plan: fallbackPlan, source: 'smart_local_planner' });
  }
});

// POST /api/generate-exercise (For teachers - Phiếu bài tập, Thực hành, Kiểm tra nhanh)
app.post('/api/generate-exercise', async (req, res) => {
  try {
    const { grade = 4, lessonTitle = 'Bài học Scratch', level = 'Thông hiểu', questionCount = 3, questionType = 'Trắc nghiệm' } = req.body;

    if (!aiClient) {
      const fallback = {
        title: `PHIẾU BÀI TẬP TIN HỌC SCRATCH – LỚP ${grade}`,
        lessonTitle,
        objective: `Củng cố kiến thức và kỹ năng thực hành theo nội dung ${lessonTitle} SGK Tin học ${grade}.`,
        targetGrade: grade,
        questions: [
          {
            number: 1,
            type: 'Nhận biết',
            question: `Khối lệnh nào sau đây dùng để bắt đầu chạy chương trình khi người xem nhấn vào lá cờ xanh trong ${lessonTitle}?`,
            options: [
              'A. [khi bấm vào cờ xanh]',
              'B. [di chuyển 10 bước]',
              'C. [đặt điểm thành 0]',
              'D. [dừng lại tất cả]'
            ],
            answer: 'Đáp án: A. [khi bấm vào cờ xanh]',
            explanation: 'Khối lệnh [khi bấm vào cờ xanh] là lệnh sự kiện bắt đầu trong SGK Tin học.',
            rubricPoint: '2.5 điểm'
          },
          {
            number: 2,
            type: level,
            question: `Trong ${lessonTitle}, thứ tự thực hiện các khối lệnh có ảnh hưởng như thế nào đến kết quả của nhân vật?`,
            options: [
              'A. Máy tính thực hiện lần lượt từ trên xuống dưới theo đúng thứ tự',
              'B. Máy tính thực hiện ngẫu nhiên không cần thứ tự',
              'C. Lệnh nào ở dưới sẽ chạy trước',
              'D. Thứ tự lệnh không quan trọng'
            ],
            answer: 'Đáp án: A. Máy tính thực hiện lần lượt từ trên xuống dưới theo đúng thứ tự',
            explanation: 'Theo SGK Tin học, các lệnh trong chương trình được thực hiện tuần tự từ trên xuống dưới.',
            rubricPoint: '2.5 điểm'
          }
        ],
        practicalTask: {
          title: `Nhiệm vụ thực hành trên máy tính: ${lessonTitle}`,
          requirements: [
            `Khởi động Scratch và tạo chương trình theo yêu cầu của ${lessonTitle}.`,
            'Sử dụng đúng các khối lệnh trọng tâm đã học.',
            'Bấm Cờ xanh chạy thử và quan sát kết quả.'
          ],
          expectedCode: 'Gắn khối [khi bấm vào cờ xanh] ở trên cùng, tiếp theo là các khối lệnh hành động tuần tự.'
        },
        gradingGuide: [
          'Tạo đúng cấu trúc chương trình theo yêu cầu: 4 điểm',
          'Chương trình chạy được khi bấm cờ xanh: 4 điểm',
          'Trình bày sáng tạo và đúng thứ tự: 2 điểm'
        ]
      };
      return res.json({ exercise: fallback, source: 'template' });
    }

    const prompt = `Bạn là chuyên gia sư phạm Tin học Tiểu học Việt Nam, biên soạn đề kiểm tra bám sát SGK Tin học 4 và SGK Tin học 5 (Bộ Kết nối tri thức với cuộc sống).
Hãy tạo bộ câu hỏi luyện tập/kiểm tra cho giáo viên:
- Lớp: Lớp ${grade}
- Bài học: "${lessonTitle}"
- Mức độ: "${level}"
- Số câu trắc nghiệm: ${questionCount} câu
- Dạng câu hỏi: "${questionType}"

BẮT BUỘC TRẢ VỀ JSON THUẦN TÚY:
{
  "title": "PHIẾU BÀI TẬP TIN HỌC SCRATCH – LỚP ${grade}",
  "lessonTitle": "${lessonTitle}",
  "objective": "Mục tiêu đánh giá năng lực học sinh",
  "targetGrade": ${grade},
  "questions": [
    {
      "number": 1,
      "type": "${level}",
      "question": "Nội dung câu hỏi dùng đúng thuật ngữ SGK",
      "options": ["A...", "B...", "C...", "D..."],
      "answer": "Đáp án đúng kèm giải thích ngắn",
      "explanation": "Giải thích sư phạm",
      "rubricPoint": "Điểm số"
    }
  ],
  "practicalTask": {
    "title": "Nhiệm vụ thực hành trên máy tính",
    "requirements": ["Yêu cầu 1", "Yêu cầu 2", "Yêu cầu 3"],
    "expectedCode": "Gợi ý khối lệnh"
  },
  "gradingGuide": ["Tiêu chí 1", "Tiêu chí 2", "Tiêu chí 3"]
}`;

    const generatedJson = await callGeminiWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    let exercise;
    try {
      exercise = JSON.parse(generatedJson || '{}');
    } catch {
      exercise = {
        title: `PHIẾU BÀI TẬP SCRATCH LỚP ${grade}`,
        lessonTitle,
        objective: 'Kiểm tra đánh giá kiến thức',
        targetGrade: grade,
        questions: [],
        practicalTask: {
          title: 'Bài tập thực hành',
          requirements: ['Thực hành theo hướng dẫn SGK'],
          expectedCode: 'Ghép lệnh tuần tự'
        },
        gradingGuide: ['Hoàn thành bài tập']
      };
    }

    return res.json({ exercise, source: 'gemini' });
  } catch (error: any) {
    console.error('Exercise generator error:', error);
    const { grade = 4, lessonTitle = 'Bài học Scratch' } = req.body || {};
    const fallback = {
      title: `PHIẾU BÀI TẬP TIN HỌC SCRATCH – LỚP ${grade}`,
      lessonTitle,
      objective: `Củng cố kiến thức theo ${lessonTitle}.`,
      targetGrade: grade,
      questions: [],
      practicalTask: {
        title: 'Nhiệm vụ thực hành',
        requirements: ['Tạo chương trình theo SGK'],
        expectedCode: 'Khối lệnh tuần tự'
      },
      gradingGuide: ['Đánh giá theo chuẩn cần đạt của SGK']
    };
    return res.json({ exercise: fallback, source: 'template' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Serve frontend in dev (using Vite middleware) or prod (static dist)
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
