import { Exercise } from '../types';

export const EXERCISES_DATA: Exercise[] = [
  // =========================================================================
  // LỚP 4: BÀI 13. LÀM QUEN VỚI MÔI TRƯỜNG LẬP TRÌNH TRỰC QUAN (grade4_lesson13)
  // =========================================================================
  {
    id: 'ex-g4-13-1',
    grade: 4,
    lessonId: 'grade4_lesson13',
    lessonTitle: 'Bài 13. Làm quen với môi trường lập trình trực quan',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Nhận biết Sân khấu Scratch',
    question: 'Trong môi trường lập trình Scratch, khu vực nào là nơi hiển thị kết quả hoạt động của chương trình và nơi các nhân vật biểu diễn?',
    options: ['Sân khấu (Stage)', 'Vùng lập trình', 'Khu vực nhóm lệnh', 'Thanh công cụ'],
    correctIndex: 0,
    hint: 'Nơi có nền màu trắng và chú Mèo Scratch đứng đợi lệnh.',
    explanation: 'Chính xác! Sân khấu là nơi hiển thị kết quả và hình ảnh hoạt động của các nhân vật khi chương trình chạy.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã nhầm lẫn giữa nơi ghép lệnh và nơi quan sát kết quả hoạt động.',
      relatedKnowledge: 'Sân khấu (Stage) là màn hình hiển thị kết quả; còn Vùng lập trình là nơi để kéo thả ghép các khối lệnh.',
      rethinkHint: 'Hãy nhớ lại nơi chú Mèo Scratch bước đi và biểu diễn khi em bấm Cờ xanh nhé!'
    },
    xp: 15
  },
  {
    id: 'ex-g4-13-2',
    grade: 4,
    lessonId: 'grade4_lesson13',
    lessonTitle: 'Bài 13. Làm quen với môi trường lập trình trực quan',
    level: 'recognition',
    type: 'true_false',
    typeName: 'Đúng/Sai',
    title: 'Nút Cờ xanh và Nút đỏ',
    question: 'Nháy chuột vào nút Cờ xanh (🟩) dùng để DỪNG chương trình, còn nháy chuột vào Nút đỏ (🛑) dùng để BẮT ĐẦU chạy chương trình. Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 1,
    hint: 'Màu xanh như đèn giao thông cho phép đi, màu đỏ yêu cầu dừng lại.',
    explanation: 'Chính xác! Nút Cờ xanh dùng để BẮT ĐẦU, còn Nút đỏ dùng để DỪNG chương trình.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã bị đảo ngược chức năng giữa Cờ xanh và Nút đỏ.',
      relatedKnowledge: 'Quy tắc Scratch: Cờ xanh (Green flag) khởi động chương trình; Nút đỏ (Stop) dừng chương trình.',
      rethinkHint: 'Hãy liên hệ với đèn tín hiệu giao thông: Đèn xanh được đi (bắt đầu), đèn đỏ phải dừng lại!'
    },
    xp: 15
  },
  {
    id: 'ex-g4-13-3',
    grade: 4,
    lessonId: 'grade4_lesson13',
    lessonTitle: 'Bài 13. Làm quen với môi trường lập trình trực quan',
    level: 'understanding',
    type: 'choose_block',
    typeName: 'Chọn lệnh phù hợp',
    title: 'Chọn lệnh bắt đầu chương trình',
    question: 'Để chương trình có thể bắt đầu chạy khi nháy chuột vào Cờ xanh, em cần đặt khối lệnh nào ở vị trí trên cùng?',
    options: ['[khi bấm vào cờ xanh] (màu vàng)', '[di chuyển 10 bước] (màu xanh lam)', '[đợi 1 giây] (màu cam)', '[dừng lại tất cả] (màu cam)'],
    correctIndex: 0,
    hint: 'Khối lệnh này có hình chiếc mũ cong ở trên đầu thuộc nhóm Sự kiện.',
    explanation: 'Đúng rồi! Khối [khi bấm vào cờ xanh] trong nhóm Sự kiện là khối lệnh bắt đầu cho mọi chương trình.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã chọn một khối lệnh hành động thay vì khối lệnh sự kiện bắt đầu.',
      relatedKnowledge: 'Các chương trình trong SGK Tin học 4 luôn cần khối lệnh sự kiện [khi bấm vào cờ xanh] đặt ở đầu.',
      rethinkHint: 'Hãy tìm khối lệnh có hình chiếc mũ và mang biểu tượng lá cờ xanh nhé!'
    },
    xp: 20
  },
  {
    id: 'ex-g4-13-4',
    grade: 4,
    lessonId: 'grade4_lesson13',
    lessonTitle: 'Bài 13. Làm quen với môi trường lập trình trực quan',
    level: 'application',
    type: 'ordering',
    typeName: 'Sắp xếp các bước',
    title: 'Thứ tự thao tác cơ bản trong Scratch',
    question: 'Hãy sắp xếp các thao tác sau theo đúng trình tự khi thực hiện một bài học Scratch:',
    orderingItems: [
      { id: 'step-1', text: '1. Khởi động phần mềm Scratch và nhận biết giao diện', correctOrder: 1 },
      { id: 'step-2', text: '2. Kéo các khối lệnh từ danh mục sang Vùng lập trình', correctOrder: 2 },
      { id: 'step-3', text: '3. Ghép các khối lệnh lại với nhau thành chương trình', correctOrder: 3 },
      { id: 'step-4', text: '4. Bấm Cờ xanh trên sân khấu để quan sát kết quả', correctOrder: 4 }
    ],
    hint: 'Ta cần có phần mềm và kéo ghép lệnh trước khi bấm Cờ xanh chạy thử.',
    explanation: 'Xuất sắc! Đó chính là quy trình chuẩn từ khởi động đến chạy thử chương trình trong SGK Tin học 4.',
    pedagogicalFeedback: {
      whereIsWrong: 'Thứ tự thao tác của em chưa hợp lý.',
      relatedKnowledge: 'Quy trình chuẩn: Mở giao diện ➔ Kéo lệnh vào vùng lập trình ➔ Ghép nối lệnh ➔ Bấm Cờ xanh quan sát.',
      rethinkHint: 'Em không thể bấm Cờ xanh chạy thử khi chưa ghép khối lệnh nào vào vùng lập trình.'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 4: BÀI 14. TẠO CHƯƠNG TRÌNH (grade4_lesson14)
  // =========================================================================
  {
    id: 'ex-g4-14-1',
    grade: 4,
    lessonId: 'grade4_lesson14',
    lessonTitle: 'Bài 14. Tạo chương trình',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Khái niệm chương trình',
    question: 'Theo SGK Tin học 4, một chương trình máy tính là gì?',
    options: [
      'Là một dãy các lệnh được sắp xếp theo thứ tự để hướng dẫn máy tính thực hiện nhiệm vụ',
      'Là một bức tranh vẽ sẵn trên sân khấu',
      'Là một bài hát được ghi âm vào máy tính',
      'Là một trò chơi có sẵn không cần ai điều khiển'
    ],
    correctIndex: 0,
    hint: 'Chương trình gồm nhiều chỉ dẫn nối tiếp nhau theo thứ tự.',
    explanation: 'Chính xác! Chương trình là tập hợp các lệnh được sắp xếp theo thứ tự để hướng dẫn nhân vật hoặc máy tính hoạt động.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa nắm đúng định nghĩa cốt lõi của chương trình máy tính.',
      relatedKnowledge: 'SGK Tin học 4 định nghĩa: Chương trình là tập hợp các lệnh được sắp xếp theo một thứ tự xác định.',
      rethinkHint: 'Hãy chú ý đến từ khóa "dãy các lệnh được sắp xếp theo thứ tự".'
    },
    xp: 15
  },
  {
    id: 'ex-g4-14-2',
    grade: 4,
    lessonId: 'grade4_lesson14',
    lessonTitle: 'Bài 14. Tạo chương trình',
    level: 'understanding',
    type: 'predict_result',
    typeName: 'Dự đoán kết quả chương trình',
    title: 'Thứ tự thực hiện các lệnh',
    question: 'Cho chương trình gồm 2 lệnh gắn liền nhau: \n1. [di chuyển 20 bước]\n2. [nói "Chào bạn!" trong 2 giây].\nKhi chạy chương trình, nhân vật sẽ thực hiện như thế nào?',
    options: [
      'Nhân vật bước đi 20 bước trước, sau đó mới nói "Chào bạn!" trong 2 giây',
      'Nhân vật nói "Chào bạn!" trước rồi mới bước đi',
      'Nhân vật vừa đi vừa nói cùng một lúc',
      'Nhân vật chỉ nói mà không bước đi'
    ],
    correctIndex: 0,
    hint: 'Các lệnh được máy tính thực hiện lần lượt từ trên xuống dưới.',
    explanation: 'Rất chuẩn! Khối di chuyển ở trên sẽ chạy trước, sau khi xong thì khối nói ở dưới mới chạy.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa áp dụng nguyên tắc thực hiện lệnh từ trên xuống dưới.',
      relatedKnowledge: 'Nguyên tắc bất di bất dịch: Máy tính đọc và thực hiện các lệnh tuần tự từ trên xuống dưới.',
      rethinkHint: 'Khối lệnh nào nằm ở vị trí cao hơn thì máy tính sẽ ưu tiên thực hiện trước.'
    },
    xp: 20
  },
  {
    id: 'ex-g4-14-3',
    grade: 4,
    lessonId: 'grade4_lesson14',
    lessonTitle: 'Bài 14. Tạo chương trình',
    level: 'understanding',
    type: 'find_bug',
    typeName: 'Tìm vị trí sai',
    title: 'Phát hiện lỗi sai thứ tự lệnh',
    question: 'Yêu cầu của bài là: "Chú Mèo chào bạn trước rồi mới tiến lên 30 bước". Nhưng chương trình đang ghép: Lệnh cờ xanh ➔ [di chuyển 30 bước] ➔ [nói "Xin chào!" trong 2 giây]. Lỗi sai ở đâu?',
    options: [
      'Hai khối lệnh [di chuyển] và [nói] bị đảo ngược thứ tự cho nhau',
      'Thiếu khối lệnh cờ xanh ở đầu',
      'Số bước di chuyển phải là 10 chứ không được là 30',
      'Chương trình không có lỗi nào'
    ],
    correctIndex: 0,
    hint: 'Đọc kỹ yêu cầu: Chào TRƯỚC rồi mới đi SAU.',
    explanation: 'Chính xác! Cần đổi chỗ khối [nói...] lên trước khối [di chuyển...] thì mới đúng yêu cầu đề bài.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa phát hiện ra sự lệch pha giữa yêu cầu đề bài và thứ tự khối lệnh trong chương trình.',
      relatedKnowledge: 'Thứ tự lệnh quyết định trật tự hành động: Nếu muốn Chào trước thì khối [nói] phải nằm phía trên khối [di chuyển].',
      rethinkHint: 'Hãy so sánh: Đề yêu cầu "nói trước, đi sau" trong khi chương trình lại "đi trước, nói sau".'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 4: BÀI 15. TẠO CHƯƠNG TRÌNH ĐỂ DIỄN TẢ Ý TƯỞNG (grade4_lesson15)
  // =========================================================================
  {
    id: 'ex-g4-15-1',
    grade: 4,
    lessonId: 'grade4_lesson15',
    lessonTitle: 'Bài 15. Tạo chương trình để diễn tả ý tưởng',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Quy trình diễn tả ý tưởng',
    question: 'Khi muốn lập trình để diễn tả một ý tưởng câu chuyện, bước đầu tiên em cần làm là gì?',
    options: [
      'Xác định rõ ý tưởng và các công việc cần thực hiện',
      'Ghép bừa các khối lệnh vào vùng lập trình',
      'Bấm ngay nút Cờ xanh để xem điều gì xảy ra',
      'Tắt phần mềm máy tính'
    ],
    correctIndex: 0,
    hint: 'Trước khi bắt tay vào làm, ta phải suy nghĩ xem mình muốn làm điều gì.',
    explanation: 'Đúng rồi! Cần xác định ý tưởng và phân tích công việc trước khi bắt đầu chọn khối lệnh.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã nhảy ngay vào thao tác kỹ thuật mà bỏ qua bước tư duy định hướng.',
      relatedKnowledge: 'Quy trình SGK Tin học 4: Xác định ý tưởng ➔ Xác định nhân vật, phông nền ➔ Chia các bước ➔ Chọn lệnh phù hợp.',
      rethinkHint: 'Không thể lập trình tốt nếu chưa biết rõ câu chuyện hay ý tưởng của mình là gì.'
    },
    xp: 15
  },
  {
    id: 'ex-g4-15-2',
    grade: 4,
    lessonId: 'grade4_lesson15',
    lessonTitle: 'Bài 15. Tạo chương trình để diễn tả ý tưởng',
    level: 'understanding',
    type: 'ordering',
    typeName: 'Sắp xếp các bước',
    title: 'Chuyển ý tưởng thành các bước lập trình',
    question: 'Hãy sắp xếp các bước sau để chuyển ý tưởng "Chú Mèo giới thiệu tên trường và bước vào lớp" thành chương trình:',
    orderingItems: [
      { id: 'act-1', text: '1. Khởi động chương trình khi bấm Cờ xanh', correctOrder: 1 },
      { id: 'act-2', text: '2. Mèo nói "Chào bạn, tớ học trường Kim Đồng!" trong 2 giây', correctOrder: 2 },
      { id: 'act-3', text: '3. Mèo bước tới 30 bước về phía cửa lớp', correctOrder: 3 },
      { id: 'act-4', text: '4. Mèo nói "Tớ vào lớp học bài đây!" trong 2 giây', correctOrder: 4 }
    ],
    hint: 'Lời chào giới thiệu trước ➔ di chuyển ➔ lời chào kết thúc trước khi vào lớp.',
    explanation: 'Tuyệt vời! Em đã phân tích ý tưởng thành chuỗi các bước logic rất chính xác.',
    pedagogicalFeedback: {
      whereIsWrong: 'Thứ tự các bước hành động chưa phản ánh đúng trình tự tự nhiên của câu chuyện.',
      relatedKnowledge: 'Khi diễn tả ý tưởng, các bước phải nối tiếp nhau một cách tự nhiên và hợp lý trong đời thực.',
      rethinkHint: 'Mèo cần chào giới thiệu bản thân trước khi đi và chào tạm biệt khi đã đến nơi.'
    },
    xp: 25
  },
  {
    id: 'ex-g4-15-3',
    grade: 4,
    lessonId: 'grade4_lesson15',
    lessonTitle: 'Bài 15. Tạo chương trình để diễn tả ý tưởng',
    level: 'application',
    type: 'complete_code',
    typeName: 'Hoàn thiện chương trình',
    title: 'Chọn lệnh hoàn thiện ý tưởng Mèo tập thể dục',
    question: 'Ý tưởng: Mèo nói "Tập thể dục nào!", sau đó nhảy sang phải 20 bước, rồi quay 15 độ. Khối lệnh còn thiếu ở dấu (?) là gì?\n[khi bấm cờ xanh] ➔ [nói "Tập thể dục nào!" trong 2 giây] ➔ (?) ➔ [xoay ↷ 15 độ]',
    options: ['[di chuyển 20 bước]', '[dừng lại tất cả]', '[ẩn nhân vật]', '[chuyển sang phông nền tiếp]'],
    correctIndex: 0,
    hint: 'Hành động nhảy sang phải 20 bước tương ứng với khối lệnh trong nhóm Chuyển động.',
    explanation: 'Chính xác! Khối [di chuyển 20 bước] chính là mảnh ghép còn thiếu để hoàn thiện ý tưởng.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã chọn một khối lệnh không khớp với hành động "nhảy sang phải 20 bước" trong ý tưởng.',
      relatedKnowledge: 'Mỗi hành động trong ý tưởng tương ứng với một khối lệnh cụ thể: Hành động đi/nhảy tương ứng với [di chuyển ... bước].',
      rethinkHint: 'Hãy tìm khối lệnh trong nhóm Chuyển động có chứa con số 20 bước nhé!'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 4: BÀI 16. TẠO CHƯƠNG TRÌNH ĐƠN GIẢN (grade4_lesson16)
  // =========================================================================
  {
    id: 'ex-g4-16-1',
    grade: 4,
    lessonId: 'grade4_lesson16',
    lessonTitle: 'Bài 16. Tạo chương trình đơn giản',
    level: 'recognition',
    type: 'true_false',
    typeName: 'Đúng/Sai',
    title: 'Chỉnh sửa thông số trong khối lệnh',
    question: 'Trong Scratch, chúng ta hoàn toàn có thể thay đổi các con số hoặc chữ viết bên trong các ô màu trắng của khối lệnh (ví dụ đổi số 10 thành 50 bước). Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    hint: 'Nháy chuột vào ô tròn màu trắng và gõ số mới từ bàn phím.',
    explanation: 'Đúng 100%! Việc chỉnh sửa thông số giúp chúng ta điều khiển nhân vật theo đúng ý muốn của bài toán.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em nghĩ rằng các khối lệnh Scratch có thông số cố định không sửa được.',
      relatedKnowledge: 'Các ô tròn màu trắng trong khối lệnh Scratch cho phép người lập trình nháy chuột vào và gõ thông số tùy chỉnh.',
      rethinkHint: 'Em có thể đổi 10 bước thành 20, 30 hoặc 100 bước bất kỳ lúc nào!'
    },
    xp: 15
  },
  {
    id: 'ex-g4-16-2',
    grade: 4,
    lessonId: 'grade4_lesson16',
    lessonTitle: 'Bài 16. Tạo chương trình đơn giản',
    level: 'understanding',
    type: 'choose_block',
    typeName: 'Chọn lệnh phù hợp',
    title: 'Khối lệnh xoay hướng nhân vật',
    question: 'Để làm nhân vật quay sang phải một góc 90 độ sau khi bước đi, em sử dụng khối lệnh nào trong nhóm Chuyển động?',
    options: ['[xoay ↷ 90 độ]', '[di chuyển 90 bước]', '[lướt trong 90 giây]', '[đổi kích thước một lượng 90]'],
    correctIndex: 0,
    hint: 'Khối lệnh có mũi tên vòng cung tròn theo chiều kim đồng hồ.',
    explanation: 'Chính xác! Khối [xoay ↷ 90 độ] giúp nhân vật quay hướng một góc vuông.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã nhầm lẫn giữa hành động "xoay hướng góc" và hành động "bước đi quãng đường".',
      relatedKnowledge: 'Khối [xoay ... độ] dùng để đổi hướng quay; còn khối [di chuyển ... bước] dùng để tiến lên theo hướng hiện tại.',
      rethinkHint: 'Tìm khối lệnh có biểu tượng mũi tên uốn cong theo chiều kim đồng hồ nhé!'
    },
    xp: 20
  },
  {
    id: 'ex-g4-16-3',
    grade: 4,
    lessonId: 'grade4_lesson16',
    lessonTitle: 'Bài 16. Tạo chương trình đơn giản',
    level: 'application',
    type: 'practice_task',
    typeName: 'Bài thực hành',
    title: 'Hoàn thiện chuỗi chuyển động đơn giản',
    question: 'Em hãy xác định số lượng khối lệnh tối thiểu để tạo chương trình: Khi bấm cờ xanh, Mèo đi 30 bước, chào bạn trong 2 giây rồi đi tiếp 30 bước.',
    options: ['4 khối lệnh', '2 khối lệnh', '6 khối lệnh', '10 khối lệnh'],
    correctIndex: 0,
    hint: 'Gồm: 1 khối cờ xanh + 1 khối đi + 1 khối chào + 1 khối đi tiếp.',
    explanation: 'Rất chuẩn! Chương trình gồm 4 khối lệnh: [khi bấm cờ xanh] ➔ [di chuyển 30 bước] ➔ [nói "Chào bạn!" 2 giây] ➔ [di chuyển 30 bước].',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đếm thiếu hoặc thừa các khối lệnh cần thiết cho nhiệm vụ.',
      relatedKnowledge: 'Cần phân tích từng câu lệnh: 1 lệnh bắt đầu (cờ xanh) + 3 lệnh hành động tuần tự = 4 khối lệnh.',
      rethinkHint: 'Hãy liệt kê từng khối lệnh ra giấy nháp và đếm lại xem có tất cả bao nhiêu khối nhé!'
    },
    xp: 30
  },

  // =========================================================================
  // LỚP 5: BÀI 10. CẤU TRÚC TUẦN TỰ (grade5_lesson10)
  // =========================================================================
  {
    id: 'ex-g5-10-1',
    grade: 5,
    lessonId: 'grade5_lesson10',
    lessonTitle: 'Bài 10. Cấu trúc tuần tự',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Định nghĩa cấu trúc tuần tự',
    question: 'Theo SGK Tin học 5, cấu trúc tuần tự là cấu trúc như thế nào?',
    options: [
      'Cấu trúc trong đó các lệnh được thực hiện lần lượt theo đúng thứ tự từ trên xuống dưới',
      'Cấu trúc trong đó các lệnh được lặp đi lặp lại mãi mãi',
      'Cấu trúc chỉ thực hiện lệnh khi một điều kiện được thỏa mãn',
      'Cấu trúc chạy ngẫu nhiên không theo quy luật nào'
    ],
    correctIndex: 0,
    hint: 'Tuần tự nghĩa là nối tiếp nhau lần lượt theo một trật tự xác định.',
    explanation: 'Chính xác! Cấu trúc tuần tự thực hiện các lệnh lần lượt theo đúng thứ tự từ trên xuống dưới.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã nhầm cấu trúc tuần tự với cấu trúc lặp hoặc rẽ nhánh.',
      relatedKnowledge: 'SGK Tin học 5: Cấu trúc tuần tự là cấu trúc cơ bản nhất, các lệnh chạy lần lượt từ đầu đến cuối không nhảy cóc.',
      rethinkHint: 'Hãy nhớ lại ví dụ quy trình đánh răng hoặc mặc quần áo: làm từng bước theo thứ tự.'
    },
    xp: 15
  },
  {
    id: 'ex-g5-10-2',
    grade: 5,
    lessonId: 'grade5_lesson10',
    lessonTitle: 'Bài 10. Cấu trúc tuần tự',
    level: 'understanding',
    type: 'predict_result',
    typeName: 'Dự đoán kết quả chương trình',
    title: 'Phân tích trình tự khối lệnh tuần tự',
    question: 'Chương trình gồm các lệnh:\n1. [di chuyển 50 bước]\n2. [xoay ↷ 90 độ]\n3. [di chuyển 50 bước].\nHành động của nhân vật tạo thành hình gì trên đường đi?',
    options: [
      'Đoạn đường hình chữ L gồm 2 cạnh vuông góc bằng nhau',
      'Một hình vuông khép kín 4 cạnh',
      'Một đường thẳng tắp dài 100 bước',
      'Một hình tròn xoay quanh chỗ cũ'
    ],
    correctIndex: 0,
    hint: 'Đi thẳng 50 bước, quay góc vuông 90 độ rồi đi tiếp 50 bước.',
    explanation: 'Rất thông minh! Đi 50 bước rồi quay góc vuông đi tiếp 50 bước tạo thành 2 cạnh góc vuông của chữ L.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa hình dung được quỹ đạo chuyển động theo từng lệnh tuần tự.',
      relatedKnowledge: 'Trong cấu trúc tuần tự, theo dõi từng lệnh: Lệnh 1 đi ngang ➔ Lệnh 2 đổi hướng 90 độ ➔ Lệnh 3 đi xuống = tạo chữ L.',
      rethinkHint: 'Hãy dùng ngón tay vẽ trên mặt bàn: Đi thẳng 1 đoạn, rẽ phải 1 góc vuông rồi đi tiếp 1 đoạn bằng thế!'
    },
    xp: 20
  },
  {
    id: 'ex-g5-10-3',
    grade: 5,
    lessonId: 'grade5_lesson10',
    lessonTitle: 'Bài 10. Cấu trúc tuần tự',
    level: 'application',
    type: 'find_bug',
    typeName: 'Tìm vị trí sai',
    title: 'Sửa lỗi thứ tự trong cấu trúc tuần tự',
    question: 'Một bạn học sinh muốn lập trình: "Mèo đi đến đích (di chuyển 60 bước) rồi mới reo lên: Hoan hô!". Nhưng bạn ấy lại đặt lệnh [nói "Hoan hô!" 2 giây] ở trên lệnh [di chuyển 60 bước]. Để sửa lỗi này, bạn ấy cần làm gì?',
    options: [
      'Đổi chỗ hai khối lệnh: Đưa khối [di chuyển 60 bước] lên trước khối [nói "Hoan hô!"]',
      'Xóa bỏ khối cờ xanh',
      'Thay số 60 bằng số 0',
      'Thêm một vòng lặp 10 lần'
    ],
    correctIndex: 0,
    hint: 'Đến đích trước thì phải đi trước, reo mừng sau thì phải nói sau.',
    explanation: 'Chính xác! Trong cấu trúc tuần tự, chỉ cần hoán đổi vị trí hai khối lệnh là chương trình sẽ chạy đúng ý nghĩa.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa nhận ra nguyên nhân sai sót nằm ở vị trí trước sau của hai khối lệnh.',
      relatedKnowledge: 'Khi chương trình tuần tự bị sai thứ tự hành động, cách khắc phục chuẩn là tách rời và đổi lại trật tự giữa các khối.',
      rethinkHint: 'Muốn hành động nào xảy ra trước thì phải đưa khối lệnh của hành động đó lên phía trên.'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 5: BÀI 11. CẤU TRÚC LẶP (grade5_lesson11)
  // =========================================================================
  {
    id: 'ex-g5-11-1',
    grade: 5,
    lessonId: 'grade5_lesson11',
    lessonTitle: 'Bài 11. Cấu trúc lặp',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Khái niệm cấu trúc lặp',
    question: 'Cấu trúc lặp trong lập trình được sử dụng trong trường hợp nào?',
    options: [
      'Khi một hoặc nhiều lệnh cần được thực hiện lặp đi lặp lại nhiều lần',
      'Khi muốn dừng chương trình ngay lập tức',
      'Khi chỉ muốn thực hiện lệnh duy nhất một lần',
      'Khi muốn xóa nhân vật khỏi sân khấu'
    ],
    correctIndex: 0,
    hint: 'Từ "lặp" thể hiện sự diễn ra nhiều lần của một công việc.',
    explanation: 'Chính xác! Cấu trúc lặp dùng để thực hiện lặp lại một nhóm lệnh giúp chương trình ngắn gọn và tối ưu.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa nắm đúng mục đích ra đời của cấu trúc lặp.',
      relatedKnowledge: 'SGK Tin học 5: Cấu trúc lặp cho phép thực hiện nhiều lần một khối lệnh mà không cần phải viết lại nhiều lần.',
      rethinkHint: 'Hãy nghĩ đến việc vỗ tay 10 lần hay chạy 3 vòng sân trường: đó là các hành động lặp lại.'
    },
    xp: 15
  },
  {
    id: 'ex-g5-11-2',
    grade: 5,
    lessonId: 'grade5_lesson11',
    lessonTitle: 'Bài 11. Cấu trúc lặp',
    level: 'understanding',
    type: 'true_false',
    typeName: 'Đúng/Sai',
    title: 'Vị trí lệnh trong khối lặp',
    question: 'Trong khối lệnh [lặp lại 4 lần], các lệnh muốn được lặp lại phải được đặt ở BÊN TRONG thân của khối lặp, chứ không phải đặt ở phía dưới. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    hint: 'Khối lặp có hình chữ C như vòng tay ôm lấy các khối lệnh bên trong.',
    explanation: 'Đúng 100%! Chỉ các lệnh nằm bên trong thân khối chữ C mới được máy tính lặp lại theo số lần quy định.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em nhầm lẫn về phạm vi tác dụng của khối lặp dạng chữ C (c-block).',
      relatedKnowledge: 'Khối [lặp lại ... lần] chỉ điều khiển những lệnh nằm bên trong lòng nó; các lệnh gắn dưới đáy chỉ chạy sau khi đã lặp xong.',
      rethinkHint: 'Hãy quan sát hình dáng chữ C: Nó sinh ra là để ôm các lệnh cần lặp vào trong lòng nó!'
    },
    xp: 15
  },
  {
    id: 'ex-g5-11-3',
    grade: 5,
    lessonId: 'grade5_lesson11',
    lessonTitle: 'Bài 11. Cấu trúc lặp',
    level: 'application',
    type: 'choose_block',
    typeName: 'Chọn lệnh phù hợp',
    title: 'Tối ưu chương trình vẽ hình vuông',
    question: 'Để vẽ hình vuông 4 cạnh đều nhau, thay vì ghép 4 lần cặp lệnh [di chuyển 60 bước] và [xoay ↷ 90 độ], ta sử dụng khối lệnh nào bao bên ngoài?',
    options: ['[lặp lại 4 lần]', '[lặp lại 2 lần]', '[nếu < > thì]', '[khi bấm vào cờ xanh]'],
    correctIndex: 0,
    hint: 'Hình vuông có đúng 4 cạnh bằng nhau nên số lần lặp phải là 4.',
    explanation: 'Xuất sắc! Khối [lặp lại 4 lần] ôm 2 lệnh bên trong sẽ vẽ hoàn hảo 4 cạnh của hình vuông.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chọn sai số lần lặp tương ứng với số cạnh của hình vuông.',
      relatedKnowledge: 'Hình vuông có 4 cạnh và 4 góc vuông 90 độ, do đó cần lặp lại đúng 4 lần chu kỳ: đi 1 cạnh + quay 1 góc.',
      rethinkHint: 'Đếm số cạnh của hình vuông để tìm ra con số cần điền vào khối lệnh lặp nhé!'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 5: BÀI 12. THỰC HÀNH LỆNH LẶP (grade5_lesson12)
  // =========================================================================
  {
    id: 'ex-g5-12-1',
    grade: 5,
    lessonId: 'grade5_lesson12',
    lessonTitle: 'Bài 12. Thực hành lệnh lặp',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Nhóm lệnh chứa khối lặp',
    question: 'Khối lệnh [lặp lại 10 lần] nằm trong nhóm lệnh có màu sắc đặc trưng nào trong Scratch?',
    options: ['Nhóm Điều khiển (Màu cam)', 'Nhóm Chuyển động (Màu xanh lam)', 'Nhóm Hiển thị (Màu tím)', 'Nhóm Âm thanh (Màu hồng)'],
    correctIndex: 0,
    hint: 'Nhóm lệnh màu cam chuyên điều khiển vòng lặp và rẽ nhánh.',
    explanation: 'Chính xác! Nhóm Điều khiển (Control) mang màu cam (#FFAB19).',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa nhớ vị trí phân loại màu sắc của nhóm Điều khiển.',
      relatedKnowledge: 'Trong Scratch, nhóm Điều khiển (Control) có màu cam, chứa khối [đợi], [lặp lại], [nếu - thì].',
      rethinkHint: 'Hãy tìm nhóm lệnh màu cam nằm ngay dưới nhóm Sự kiện màu vàng.'
    },
    xp: 15
  },
  {
    id: 'ex-g5-12-2',
    grade: 5,
    lessonId: 'grade5_lesson12',
    lessonTitle: 'Bài 12. Thực hành lệnh lặp',
    level: 'understanding',
    type: 'predict_result',
    typeName: 'Dự đoán kết quả chương trình',
    title: 'Tính tổng quãng đường nhân vật đi được',
    question: 'Cho chương trình: [lặp lại 5 lần] bên trong có khối [di chuyển 20 bước]. Hỏi sau khi chạy xong, chú Mèo đã di chuyển được tổng cộng bao nhiêu bước?',
    options: ['100 bước', '20 bước', '25 bước', '50 bước'],
    correctIndex: 0,
    hint: 'Lấy số lần lặp nhân với số bước của mỗi lần (5 x 20).',
    explanation: 'Chính xác! 5 lần nhân với 20 bước mỗi lần = tổng cộng 100 bước.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa thực hiện phép tính nhân giữa số lần lặp và số bước của mỗi lượt.',
      relatedKnowledge: 'Khi lặp lại 5 lần việc đi 20 bước, tổng quãng đường là: 5 × 20 = 100 bước.',
      rethinkHint: 'Mỗi lần lặp Mèo đi 20 bước. Lặp lại 5 lần như thế thì tổng cộng là bao nhiêu?'
    },
    xp: 20
  },
  {
    id: 'ex-g5-12-3',
    grade: 5,
    lessonId: 'grade5_lesson12',
    lessonTitle: 'Bài 12. Thực hành lệnh lặp',
    level: 'application',
    type: 'complete_code',
    typeName: 'Hoàn thiện chương trình',
    title: 'Hoạt ảnh Mèo bước đi nhịp nhàng',
    question: 'Để nhân vật bước đi như cử động thật, ta đặt khối nào vào giữa hai bước đi trong vòng lặp?\n[lặp lại 10 lần] ➔ [di chuyển 10 bước] ➔ (?) ➔ [trang phục kế tiếp]',
    options: ['[đợi 0.2 giây]', '[dừng lại tất cả]', '[về vị trí ngẫu nhiên]', '[bật âm thanh meow 10 lần]'],
    correctIndex: 0,
    hint: 'Cần một khoảng dừng thời gian ngắn để mắt người kịp nhìn thấy cử động đổi trang phục.',
    explanation: 'Rất chuẩn! Khối [đợi 0.2 giây] tạo nhịp nghỉ giúp các bước chân chuyển động tự nhiên.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa chọn khối lệnh điều chỉnh thời gian giữa các khung hình hoạt ảnh.',
      relatedKnowledge: 'Máy tính xử lý rất nhanh, nếu không có khối [đợi ... giây] thì các bước chuyển sẽ xảy ra chớp nhoáng khó nhìn thấy.',
      rethinkHint: 'Hãy tìm khối lệnh trong nhóm Điều khiển giúp nhân vật dừng lại một tích tắc trước khi đổi tư thế.'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 5: BÀI 13. CẤU TRÚC RẼ NHÁNH (grade5_lesson13)
  // =========================================================================
  {
    id: 'ex-g5-13-1',
    grade: 5,
    lessonId: 'grade5_lesson13',
    lessonTitle: 'Bài 13. Cấu trúc rẽ nhánh',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Hai dạng của cấu trúc rẽ nhánh',
    question: 'Theo SGK Tin học 5, cấu trúc rẽ nhánh gồm có những dạng nào?',
    options: [
      'Dạng thiếu (Nếu – thì) và dạng đủ (Nếu – thì – nếu không thì)',
      'Dạng tròn và dạng vuông',
      'Dạng ngắn và dạng dài',
      'Dạng đơn và dạng kép không điều kiện'
    ],
    correctIndex: 0,
    hint: 'Dạng thiếu chỉ có 1 vế hành động; dạng đủ có cả 2 vế hành động ứng với Đúng và Sai.',
    explanation: 'Chính xác! SGK Tin học 5 phân biệt rõ: Cấu trúc rẽ nhánh dạng thiếu và Cấu trúc rẽ nhánh dạng đủ.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa dùng đúng thuật ngữ phân loại của cấu trúc rẽ nhánh theo SGK.',
      relatedKnowledge: 'SGK Tin học 5 quy định chuẩn: Cấu trúc rẽ nhánh gồm 2 dạng: dạng thiếu (Nếu... thì) và dạng đủ (Nếu... thì... nếu không thì).',
      rethinkHint: 'Hãy nhớ lại tên gọi của 2 khối lệnh rẽ nhánh màu cam trong Scratch!'
    },
    xp: 15
  },
  {
    id: 'ex-g5-13-2',
    grade: 5,
    lessonId: 'grade5_lesson13',
    lessonTitle: 'Bài 13. Cấu trúc rẽ nhánh',
    level: 'understanding',
    type: 'choose_block',
    typeName: 'Chọn lệnh phù hợp',
    title: 'Hình dạng của ô điều kiện trong Scratch',
    question: 'Ô chứa điều kiện trong khối lệnh [nếu < ... > thì] có hình dạng đặc trưng nào?',
    options: ['Hình lục giác sắc nhọn 2 đầu', 'Hình tròn bầu dục', 'Hình chữ nhật vuông góc', 'Hình tam giác'],
    correctIndex: 0,
    hint: 'Chỉ các khối lệnh có hình lục giác mới lắp vừa vào ô này.',
    explanation: 'Đúng rồi! Các khối điều kiện trong Scratch luôn có hình lục giác (cho kết quả Đúng hoặc Sai).',
    pedagogicalFeedback: {
      whereIsWrong: 'Em nhầm lẫn hình dạng khối biểu thức tròn với khối điều kiện lục giác.',
      relatedKnowledge: 'Quy tắc lắp ghép Scratch: Ô lục giác chứa điều kiện logic (Đúng/Sai); ô tròn chứa giá trị số hoặc chữ.',
      rethinkHint: 'Quan sát ô trống giữa chữ "nếu" và chữ "thì": nó có 2 đầu nhọn hình lục giác!'
    },
    xp: 20
  },
  {
    id: 'ex-g5-13-3',
    grade: 5,
    lessonId: 'grade5_lesson13',
    lessonTitle: 'Bài 13. Cấu trúc rẽ nhánh',
    level: 'application',
    type: 'predict_result',
    typeName: 'Dự đoán kết quả chương trình',
    title: 'Kiểm tra kết quả của cấu trúc rẽ nhánh dạng đủ',
    question: 'Cho câu lệnh: Nếu <Điểm > 5> thì nói "Đạt!" nếu không thì nói "Cần cố gắng!".\nNếu hiện tại biến Điểm đang bằng 8, nhân vật sẽ nói câu gì?',
    options: ['"Đạt!"', '"Cần cố gắng!"', 'Không nói câu nào', 'Nói cả hai câu'],
    correctIndex: 0,
    hint: 'So sánh số 8 với số 5: 8 > 5 là Đúng hay Sai?',
    explanation: 'Chính xác! Vì 8 lớn hơn 5 là ĐÚNG, nên chương trình sẽ thực hiện nhánh [thì] và nói "Đạt!".',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa đối chiếu giá trị cụ thể vào biểu thức điều kiện so sánh.',
      relatedKnowledge: 'Khi điều kiện ĐÚNG (8 > 5 là Đúng), máy tính chỉ chạy lệnh trong ngăn [thì], bỏ qua ngăn [nếu không thì].',
      rethinkHint: '8 có lớn hơn 5 không? Có! Vậy máy tính sẽ chọn nhánh đầu tiên ứng với trường hợp Đúng.'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 5: BÀI 14. BIẾN (grade5_lesson14)
  // =========================================================================
  {
    id: 'ex-g5-14-1',
    grade: 5,
    lessonId: 'grade5_lesson14',
    lessonTitle: 'Bài 14. Biến',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Khái niệm biến trong SGK Tin học 5',
    question: 'Theo SGK Tin học 5, biến là gì?',
    options: [
      'Là vùng nhớ được đặt tên dùng để lưu trữ dữ liệu có thể thay đổi trong quá trình thực hiện chương trình',
      'Là một bức tranh vẽ cảnh nền có thể đổi màu',
      'Là một nhân vật có thể biến hình thành con vật khác',
      'Là một khối lệnh chỉ dùng được một lần duy nhất'
    ],
    correctIndex: 0,
    hint: 'Biến là chiếc hộp lưu trữ dữ liệu có dán nhãn tên.',
    explanation: 'Chính xác! Biến là vùng nhớ có tên dùng để lưu giữ dữ liệu có thể thay đổi trong khi chương trình chạy.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã hiểu nhầm từ "biến" theo nghĩa biến hình thay vì khái niệm biến số trong Tin học.',
      relatedKnowledge: 'SGK Tin học 5: Biến (Variable) là vùng nhớ lưu trữ dữ liệu mang tên gọi nhất định.',
      rethinkHint: 'Hãy nhớ lại ví dụ chiếc hộp dán nhãn "Điểm số" để lưu số điểm của người chơi.'
    },
    xp: 15
  },
  {
    id: 'ex-g5-14-2',
    grade: 5,
    lessonId: 'grade5_lesson14',
    lessonTitle: 'Bài 14. Biến',
    level: 'understanding',
    type: 'true_false',
    typeName: 'Đúng/Sai',
    title: 'Phân biệt lệnh đặt và lệnh thay đổi biến',
    question: 'Khối lệnh [đặt [Điểm] thành 0] và khối lệnh [thay đổi [Điểm] một lượng 1] có chức năng hoàn toàn giống nhau. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 1,
    hint: 'Một khối dùng để gán giá trị cố định ban đầu, một khối dùng để cộng thêm dồn điểm.',
    explanation: 'Chính xác! [đặt... thành...] là gán giá trị mới; còn [thay đổi... một lượng...] là cộng thêm hoặc trừ bớt vào giá trị cũ.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã nhầm lẫn giữa phép gán giá trị và phép cộng dồn biến số.',
      relatedKnowledge: '[đặt [Điểm] thành 0] biến Điểm luôn bằng 0; còn [thay đổi [Điểm] 1] là lấy điểm cũ cộng thêm 1 đơn vị.',
      rethinkHint: 'Nếu đang có 5 điểm mà dùng lệnh [đặt thành 0] thì mất hết điểm, còn dùng [thay đổi 1] thì thành 6 điểm!'
    },
    xp: 20
  },
  {
    id: 'ex-g5-14-3',
    grade: 5,
    lessonId: 'grade5_lesson14',
    lessonTitle: 'Bài 14. Biến',
    level: 'application',
    type: 'predict_result',
    typeName: 'Dự đoán kết quả chương trình',
    title: 'Tính giá trị cuối cùng của biến',
    question: 'Cho đoạn chương trình:\n1. [đặt [Số kẹo] thành 5]\n2. [thay đổi [Số kẹo] một lượng 2]\n3. [thay đổi [Số kẹo] một lượng 3]\nSau khi chạy xong, biến Số kẹo có giá trị là bao nhiêu?',
    options: ['10', '5', '8', '3'],
    correctIndex: 0,
    hint: 'Bắt đầu có 5 cái kẹo, được cho thêm 2 cái, rồi lại được cho thêm 3 cái nữa (5 + 2 + 3).',
    explanation: 'Quá chuẩn! 5 ban đầu + 2 + 3 = 10 cái kẹo.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em tính toán chưa chính xác các bước cộng dồn giá trị của biến.',
      relatedKnowledge: 'Giá trị biến thay đổi qua từng dòng: Ban đầu = 5 ➔ Sau dòng 2 = 7 ➔ Sau dòng 3 = 10.',
      rethinkHint: 'Lấy giá trị khởi tạo ban đầu là 5, cộng thêm 2 rồi cộng tiếp 3 xem bằng bao nhiêu nhé!'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 5: BÀI 15. BIỂU THỨC (grade5_lesson15)
  // =========================================================================
  {
    id: 'ex-g5-15-1',
    grade: 5,
    lessonId: 'grade5_lesson15',
    lessonTitle: 'Bài 15. Biểu thức',
    level: 'recognition',
    type: 'multiple_choice',
    typeName: 'Trắc nghiệm',
    title: 'Nhóm lệnh chứa các phép toán biểu thức',
    question: 'Trong Scratch, các khối lệnh biểu thức số học (+, -, *, /) và so sánh nằm trong nhóm lệnh nào?',
    options: ['Các phép toán (Màu xanh lá)', 'Chuyển động (Màu xanh lam)', 'Hiển thị (Màu tím)', 'Các biến (Màu cam đậm)'],
    correctIndex: 0,
    hint: 'Nhóm lệnh mang màu xanh lá cây tươi sáng (#59C059).',
    explanation: 'Chính xác! Nhóm Các phép toán (Operators) có màu xanh lá cây.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa định vị đúng nhóm lệnh Các phép toán trên danh mục Scratch.',
      relatedKnowledge: 'Nhóm Các phép toán mang màu xanh lá cây, chứa các phép tính cộng, trừ, nhân, chia và các phép so sánh lớn hơn, nhỏ hơn, bằng.',
      rethinkHint: 'Hãy tìm nhóm lệnh màu xanh lá cây nằm ở giữa nhóm Cảm biến và nhóm Các biến.'
    },
    xp: 15
  },
  {
    id: 'ex-g5-15-2',
    grade: 5,
    lessonId: 'grade5_lesson15',
    lessonTitle: 'Bài 15. Biểu thức',
    level: 'understanding',
    type: 'predict_result',
    typeName: 'Dự đoán kết quả chương trình',
    title: 'Tính toán giá trị biểu thức số học',
    question: 'Khối lệnh [nói ((4 * 5) + 10) trong 2 giây] sẽ làm nhân vật hiển thị con số nào trên sân khấu?',
    options: ['30', '20', '45', '14'],
    correctIndex: 0,
    hint: 'Thực hiện phép nhân trước: 4 x 5 = 20, sau đó cộng 10 = 30.',
    explanation: 'Rất chuẩn! (4 x 5) + 10 = 20 + 10 = 30.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em tính nhầm thứ tự ưu tiên của phép tính toán học.',
      relatedKnowledge: 'Quy tắc toán học trong biểu thức: Thực hiện phép tính nhân chia trước, cộng trừ sau: 4 × 5 = 20; 20 + 10 = 30.',
      rethinkHint: 'Tính trong ngoặc trước: 4 nhân 5 bằng bao nhiêu, rồi lấy kết quả đó cộng thêm 10.'
    },
    xp: 20
  },
  {
    id: 'ex-g5-15-3',
    grade: 5,
    lessonId: 'grade5_lesson15',
    lessonTitle: 'Bài 15. Biểu thức',
    level: 'application',
    type: 'choose_block',
    typeName: 'Chọn lệnh phù hợp',
    title: 'Sử dụng biểu thức so sánh làm điều kiện',
    question: 'Để kiểm tra xem "Điểm số của em đã đạt từ 50 điểm trở lên chưa", em sử dụng khối biểu thức so sánh nào?',
    options: ['<(Điểm) > 49> hoặc <(Điểm) = 50>', '[(Điểm) + 50]', '[(Điểm) * 50]', '[(Điểm) / 50]'],
    correctIndex: 0,
    hint: 'Cần khối lục giác so sánh lớn hơn hoặc bằng chứ không phải khối tính toán số học tròn.',
    explanation: 'Chính xác! Chỉ có biểu thức so sánh (hình lục giác) mới trả về kết quả Đúng/Sai để làm điều kiện rẽ nhánh.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em đã chọn một phép tính số học (+, *, /) thay vì một phép so sánh logic.',
      relatedKnowledge: 'Để kiểm tra điều kiện, phải dùng biểu thức so sánh (>, <, =) trong nhóm Các phép toán.',
      rethinkHint: 'Tìm khối lệnh hình lục giác có chứa dấu so sánh lớn hơn (>) hoặc bằng (=) nhé!'
    },
    xp: 25
  },

  // =========================================================================
  // LỚP 5: BÀI 16. TỪ KỊCH BẢN ĐẾN CHƯƠNG TRÌNH (grade5_lesson16)
  // =========================================================================
  {
    id: 'ex-g5-16-1',
    grade: 5,
    lessonId: 'grade5_lesson16',
    lessonTitle: 'Bài 16. Từ kịch bản đến chương trình',
    level: 'recognition',
    type: 'ordering',
    typeName: 'Sắp xếp các bước',
    title: 'Quy trình tổng hợp từ kịch bản đến chương trình',
    question: 'Hãy sắp xếp các giai đoạn sau theo đúng quy trình chuẩn của SGK Tin học 5:',
    orderingItems: [
      { id: 'flow-1', text: '1. Kịch bản câu chuyện hoặc trò chơi', correctOrder: 1 },
      { id: 'flow-2', text: '2. Phân tích yêu cầu và xác định các bước', correctOrder: 2 },
      { id: 'flow-3', text: '3. Lựa chọn cấu trúc lập trình (Tuần tự, Lặp, Rẽ nhánh)', correctOrder: 3 },
      { id: 'flow-4', text: '4. Tạo chương trình, chạy thử và điều chỉnh lỗi', correctOrder: 4 }
    ],
    hint: 'Bắt đầu bằng Kịch bản ➔ Phân tích ➔ Chọn cấu trúc ➔ Viết và chạy thử.',
    explanation: 'Tuyệt đỉnh! Đây chính là phương pháp lập trình khoa học của một lập trình viên nhí chuyên nghiệp.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em sắp xếp chưa đúng các bước trong quy trình chuyển giao từ kịch bản sang chương trình.',
      relatedKnowledge: 'SGK Tin học 5: Kịch bản ➔ Phân tích yêu cầu ➔ Lựa chọn cấu trúc ➔ Tạo chương trình ➔ Chạy thử & Điều chỉnh.',
      rethinkHint: 'Phải có kịch bản trước, phân tích cấu trúc rồi mới bắt tay vào ghép mã và chạy thử.'
    },
    xp: 25
  },
  {
    id: 'ex-g5-16-2',
    grade: 5,
    lessonId: 'grade5_lesson16',
    lessonTitle: 'Bài 16. Từ kịch bản đến chương trình',
    level: 'understanding',
    type: 'choose_block',
    typeName: 'Chọn lệnh phù hợp',
    title: 'Lựa chọn cấu trúc cho tình huống kịch bản',
    question: 'Kịch bản: "Quả bóng rơi liên tục từ trên xuống. Khi chạm vào thanh đỡ thì nảy ngược lên". Hành động "khi chạm thanh đỡ thì nảy lên" cần sử dụng cấu trúc nào?',
    options: [
      'Cấu trúc rẽ nhánh [nếu <đang chạm thanh đỡ?> thì [bật lên]]',
      'Chỉ dùng cấu trúc tuần tự đơn giản',
      'Chỉ dùng một khối lệnh âm thanh',
      'Không cần dùng cấu trúc điều khiển nào'
    ],
    correctIndex: 0,
    hint: 'Có từ khóa "KHI / NẾU chạm vào thanh đỡ" ➔ Kiểm tra điều kiện.',
    explanation: 'Chính xác! Đây là tình huống kiểm tra điều kiện va chạm, bắt buộc dùng Cấu trúc rẽ nhánh.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa nhận diện được dấu hiệu của cấu trúc rẽ nhánh trong lời văn của kịch bản.',
      relatedKnowledge: 'Khi kịch bản có các điều kiện "nếu... thì...", "khi chạm vào...", ta phải lựa chọn Cấu trúc rẽ nhánh.',
      rethinkHint: 'Từ "chạm vào thanh đỡ" là một điều kiện kiểm tra, vì thế phải dùng khối [nếu... thì].'
    },
    xp: 25
  },
  {
    id: 'ex-g5-16-3',
    grade: 5,
    lessonId: 'grade5_lesson16',
    lessonTitle: 'Bài 16. Từ kịch bản đến chương trình',
    level: 'application',
    type: 'find_bug',
    typeName: 'Tìm vị trí sai',
    title: 'Khắc phục lỗi logic so với kịch bản',
    question: 'Kịch bản yêu cầu: "Chạy xong 5 vòng thi thì Mèo reo to: Chiến thắng!". Nhưng trên thực tế, sau MỖI VÒNG CHẠY, Mèo lại reo to: Chiến thắng!. Nguyên nhân do đâu?',
    options: [
      'Khối lệnh [nói "Chiến thắng!"] bị đặt nhầm vào BÊN TRONG khối lặp thay vì đặt ở PHÍA DƯỚI khối lặp',
      'Số lần lặp bị đặt thành 10 lần',
      'Chưa bấm nút Cờ xanh',
      'Biến điểm số chưa được cộng'
    ],
    correctIndex: 0,
    hint: 'Việc reo mừng chỉ làm 1 lần DUY NHẤT sau khi đã chạy xong toàn bộ 5 vòng.',
    explanation: 'Chính xác! Đặt khối nói bên trong vòng lặp khiến nó bị lặp lại sau mỗi vòng. Cần kéo khối nói ra ngoài đáy vòng lặp.',
    pedagogicalFeedback: {
      whereIsWrong: 'Em chưa phân biệt được hành động cần lặp nhiều lần và hành động kết thúc chỉ làm 1 lần.',
      relatedKnowledge: 'Hành động kết thúc toàn bộ quá trình phải nằm ngoài (sau khi kết thúc vòng lặp), không được nằm bên trong thân vòng lặp.',
      rethinkHint: 'Reo chiến thắng chỉ làm 1 lần khi đã xong hết 5 vòng, vì thế khối nói phải nằm phía dưới vòng lặp.'
    },
    xp: 30
  }
];
