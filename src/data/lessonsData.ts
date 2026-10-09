import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  // =========================================================================
  // LỚP 4: SGK TIN HỌC 4 – BỘ KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // CHỦ ĐỀ F: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
  // =========================================================================

  // -------------------------------------------------------------------------
  // BÀI 13. LÀM QUEN VỚI MÔI TRƯỜNG LẬP TRÌNH TRỰC QUAN
  // -------------------------------------------------------------------------
  {
    id: 'grade4_lesson13',
    grade: 4,
    lessonNumber: 13,
    title: 'BÀI 13. LÀM QUEN VỚI MÔI TRƯỜNG LẬP TRÌNH TRỰC QUAN',
    themeTitle: 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Nhận biết được môi trường lập trình trực quan Scratch; nhận biết các thành phần chính: Sân khấu, Nhân vật, Vùng lập trình, Nhóm lệnh và các Lệnh.',
      do: 'Thực hiện được các thao tác cơ bản: mở chương trình, chạy chương trình bằng Cờ xanh, dừng chương trình bằng Nút đỏ, và quan sát kết quả trên sân khấu.',
      thinking: 'Hình thành bước đầu nhận thức: máy tính thực hiện các lệnh do con người điều khiển thông qua các khối lệnh trực quan.'
    },
    keyKnowledge: {
      summary: 'Môi trường lập trình trực quan Scratch là nơi chúng ta tạo ra các chương trình bằng cách ghép các khối lệnh có hình dạng và màu sắc khác nhau, thay vì phải gõ văn bản phức tạp.',
      points: [
        { title: 'Sân khấu (Stage)', desc: 'Nơi hiển thị kết quả hoạt động của chương trình, nơi các nhân vật biểu diễn.', icon: '🎭' },
        { title: 'Nhân vật (Sprite)', desc: 'Đối tượng thực hiện các hành động theo lệnh trong chương trình (như chú Mèo Scratch).', icon: '🐱' },
        { title: 'Vùng lập trình (Script area)', desc: 'Khu vực ở giữa để kéo, thả và ghép nối các khối lệnh tạo thành chương trình.', icon: '🧩' },
        { title: 'Khu vực khối lệnh & Nhóm lệnh', desc: 'Nơi chứa các khối lệnh được phân loại theo từng nhóm lệnh có màu sắc riêng biệt (Chuyển động, Hiển thị, Âm thanh, Sự kiện,...).', icon: '🎨' },
        { title: 'Cờ xanh và Nút đỏ', desc: 'Bấm Cờ xanh (🟩) để bắt đầu chạy chương trình. Bấm Nút đỏ (🛑) để dừng chương trình.', icon: '🚩' }
      ]
    },
    keywords: [
      { term: 'Môi trường lập trình trực quan', meaning: 'Phần mềm cho phép tạo chương trình bằng cách kéo thả các khối lệnh trực quan.' },
      { term: 'Sân khấu', meaning: 'Nơi hiển thị kết quả và hoạt động của nhân vật khi chương trình chạy.' },
      { term: 'Nhân vật', meaning: 'Đối tượng biểu diễn trên sân khấu theo các lệnh được giao.' },
      { term: 'Vùng lập trình', meaning: 'Khu vực để lắp ghép các khối lệnh thành chương trình.' },
      { term: 'Lệnh', meaning: 'Một chỉ dẫn cụ thể yêu cầu máy tính thực hiện một việc nhất định.' },
      { term: 'Nhóm lệnh', meaning: 'Tập hợp các lệnh cùng loại được đánh dấu bằng cùng một màu sắc.' }
    ],
    observation: {
      title: 'Quan sát màn hình Scratch khi khởi động',
      description: 'Nhìn vào màn hình làm việc của Scratch, em sẽ thấy bên trái là các Nhóm lệnh nhiều màu sắc, ở giữa là Vùng lập trình rộng rãi, bên phải là Sân khấu màu trắng với Chú Mèo Scratch đang đứng sẵn sàng nhận lệnh.',
      sampleBlocks: [
        { id: 'g4-13-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', explanation: 'Lệnh bắt đầu chương trình khi nháy chuột vào Cờ xanh' },
        { id: 'g4-13-b2', category: 'motion', text: 'di chuyển 10 bước', shape: 'stack', explanation: 'Lệnh yêu cầu nhân vật bước tới 10 bước' }
      ],
      highlight: 'Sân khấu hiển thị kết quả; Vùng lập trình là nơi ghép lệnh!'
    },
    exploration: {
      title: 'Khám phá các thành phần trên màn hình',
      question: 'Khi em bấm vào nút Cờ xanh ở góc trên của Sân khấu, điều gì sẽ xảy ra nếu em chưa ghép khối lệnh nào vào Vùng lập trình?',
      interactivePoints: [
        'Nếu vùng lập trình trống rỗng, nhân vật sẽ đứng yên vì chưa có lệnh nào được ban hành.',
        'Mỗi khối lệnh có các mấu lồi và vết lõm để ghép khít vào nhau như các mảnh đồ chơi xếp hình.',
        'Các nhóm lệnh được phân biệt rõ bằng màu: Chuyển động (xanh lam), Hiển thị (tím), Âm thanh (hồng tím), Sự kiện (vàng).'
      ]
    },
    practice: {
      title: 'Thực hành: Làm quen thao tác kéo thả và chạy chương trình',
      goal: 'Kéo lệnh [khi bấm vào cờ xanh] và lệnh [di chuyển 10 bước] vào vùng lập trình, sau đó bấm Cờ xanh để quan sát chú Mèo di chuyển.',
      steps: [
        'Bước 1: Chọn nhóm lệnh Sự kiện (màu vàng), kéo lệnh [khi bấm vào cờ xanh] vào vùng lập trình.',
        'Bước 2: Chọn nhóm lệnh Chuyển động (màu xanh lam), kéo lệnh [di chuyển 10 bước] ghép vào bên dưới lệnh cờ xanh.',
        'Bước 3: Nháy chuột vào Cờ xanh (🟩) trên sân khấu và quan sát chú Mèo bước đi.',
        'Bước 4: Nháy chuột vào Nút đỏ (🛑) để kết thúc.'
      ],
      initialBlocks: [],
      targetBlocks: [
        { id: 'p4-13-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p4-13-2', category: 'motion', text: 'di chuyển 10 bước', shape: 'stack' }
      ],
      hint: 'Hãy chú ý ghép sát mấu nối của khối di chuyển vào chân của khối cờ xanh cho đến khi nghe tiếng tách!'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Khi bấm Cờ xanh, chú Mèo Scratch trên sân khấu bước lên phía trước một đoạn 10 bước.',
      partialCriteria: 'Gần đúng: Khối lệnh đã được kéo vào nhưng chưa gắn khít với nhau, bấm cờ xanh nhân vật chưa di chuyển.',
      reviewAdvice: 'Hãy kéo khối di chuyển lại sát bên dưới khối cờ xanh để chúng dính liền thành một khối thống nhất.'
    },
    summary: {
      takeaways: [
        'Môi trường lập trình trực quan Scratch gồm các thành phần chính: Sân khấu, Nhân vật, Vùng lập trình, Nhóm lệnh và các Lệnh.',
        'Để tạo chương trình, ta kéo các lệnh từ khu vực khối lệnh sang vùng lập trình và ghép chúng lại với nhau.',
        'Bấm Cờ xanh để chạy chương trình; bấm Nút đỏ để dừng chương trình.'
      ]
    },
    teacherNotes: 'Giáo viên hướng dẫn học sinh nhận biết trực quan các khu vực trên giao diện Scratch, rèn kỹ năng cầm chuột kéo thả khối lệnh, phân biệt rõ Sân khấu (kết quả) và Vùng lập trình (nơi ghép mã).',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể chọn thêm các nhân vật khác từ thư viện nhân vật bằng cách nháy vào biểu tượng Chú mèo có dấu cộng ở góc dưới sân khấu.',
    xpReward: 30,
    nextLessonId: 'grade4_lesson14'
  },

  // -------------------------------------------------------------------------
  // BÀI 14. TẠO CHƯƠNG TRÌNH
  // -------------------------------------------------------------------------
  {
    id: 'grade4_lesson14',
    grade: 4,
    lessonNumber: 14,
    title: 'BÀI 14. TẠO CHƯƠNG TRÌNH',
    themeTitle: 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Hiểu khái niệm chương trình: một chương trình gồm các lệnh được ghép nối với nhau theo một thứ tự nhất định.',
      do: 'Biết cách chọn nhân vật, chọn nhóm lệnh, chọn lệnh, đưa lệnh vào vùng lập trình, ghép nối các lệnh và chạy thử để quan sát kết quả.',
      thinking: 'Nhận thức sâu sắc rằng: Các lệnh trong chương trình được máy tính thực hiện lần lượt từ trên xuống dưới theo đúng thứ tự.'
    },
    keyKnowledge: {
      summary: 'Một chương trình máy tính là tập hợp các lệnh được ghép lại theo thứ tự từ trên xuống dưới. Thay đổi thứ tự các lệnh có thể làm kết quả chương trình thay đổi hoàn toàn.',
      points: [
        { title: 'Chương trình là gì?', desc: 'Chương trình là dãy các lệnh được sắp xếp theo một thứ tự để hướng dẫn máy tính thực hiện một nhiệm vụ cụ thể.', icon: '📜' },
        { title: 'Quy trình tạo chương trình', desc: 'Chọn nhân vật ➔ Chọn nhóm lệnh ➔ Chọn lệnh ➔ Đưa lệnh vào vùng lập trình ➔ Ghép các lệnh lại ➔ Chạy chương trình ➔ Quan sát kết quả.', icon: '🔄' },
        { title: 'Thứ tự thực hiện lệnh', desc: 'Máy tính rất nghiêm túc, nó thực hiện lệnh trên cùng trước, rồi lần lượt đến các lệnh tiếp theo phía dưới.', icon: '⬇️' }
      ]
    },
    keywords: [
      { term: 'Chương trình', meaning: 'Dãy các lệnh được sắp xếp theo thứ tự để điều khiển máy tính hoặc nhân vật thực hiện nhiệm vụ.' },
      { term: 'Ghép lệnh', meaning: 'Hành động gắn các khối lệnh lại với nhau trong vùng lập trình theo thứ tự mong muốn.' },
      { term: 'Thứ tự thực hiện', meaning: 'Trình tự lần lượt từ trên xuống dưới mà máy tính làm theo khi chạy chương trình.' }
    ],
    observation: {
      title: 'Quan sát một chương trình gồm nhiều lệnh liên tiếp',
      description: 'Khi ta ghép khối [khi bấm vào cờ xanh], tiếp theo là khối [di chuyển 10 bước], rồi đến khối [nói "Xin chào!" trong 2 giây], chú Mèo sẽ thực hiện từng việc: đi trước rồi mới nói sau.',
      sampleBlocks: [
        { id: 'g4-14-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g4-14-b2', category: 'motion', text: 'di chuyển 10 bước', shape: 'stack' },
        { id: 'g4-14-b3', category: 'looks', text: 'nói "Xin chào!" trong 2 giây', shape: 'stack' }
      ],
      highlight: 'Lệnh nào ở trên chạy trước, lệnh nào ở dưới chạy sau!'
    },
    exploration: {
      title: 'Tìm hiểu điều gì xảy ra khi đảo thứ tự lệnh',
      question: 'Nếu em đổi chỗ hai khối lệnh: để khối [nói "Xin chào!" trong 2 giây] lên trước khối [di chuyển 10 bước], chú Mèo sẽ làm gì?',
      interactivePoints: [
        'Chú Mèo sẽ nói "Xin chào!" trong 2 giây trước, rồi sau đó mới bước đi 10 bước.',
        'Mỗi lệnh thực hiện xong thì máy tính mới chuyển sang lệnh kế tiếp.',
        'Thứ tự sắp xếp lệnh quyết định hành động của nhân vật diễn ra như thế nào.'
      ]
    },
    practice: {
      title: 'Thực hành: Ghép chương trình Mèo chào bạn và biểu diễn',
      goal: 'Tạo chương trình để chú Mèo chào bạn rồi bước đi 20 bước.',
      steps: [
        'Bước 1: Chọn nhóm Sự kiện, kéo lệnh [khi bấm vào cờ xanh] vào vùng lập trình.',
        'Bước 2: Chọn nhóm Hiển thị, kéo lệnh [nói "Xin chào bạn!" trong 2 giây] gắn vào dưới lệnh cờ xanh.',
        'Bước 3: Chọn nhóm Chuyển động, kéo lệnh [di chuyển 10 bước] gắn vào tiếp theo và sửa số 10 thành 20.',
        'Bước 4: Bấm Cờ xanh để kiểm tra xem chú Mèo có nói trước rồi đi sau hay không.'
      ],
      initialBlocks: [
        { id: 'p4-14-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p4-14-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p4-14-2', category: 'looks', text: 'nói "Xin chào bạn!" trong 2 giây', shape: 'stack' },
        { id: 'p4-14-3', category: 'motion', text: 'di chuyển 20 bước', shape: 'stack' }
      ],
      hint: 'Hãy nhớ kiểm tra thứ tự từ trên xuống dưới: Khối chào ở trên, khối di chuyển ở dưới.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Khi bấm Cờ xanh, bóng thoại "Xin chào bạn!" xuất hiện trong 2 giây, sau đó chú Mèo tiến về phía trước 20 bước.',
      partialCriteria: 'Chưa đúng thứ tự: Mèo bước đi trước rồi mới nói câu chào.',
      reviewAdvice: 'Hãy tách các khối lệnh ra và ghép lại: Đặt khối [nói...] lên trước khối [di chuyển...].'
    },
    summary: {
      takeaways: [
        'Chương trình được tạo bằng cách chọn lệnh, đưa vào vùng lập trình và ghép nối các lệnh lại.',
        'Các lệnh trong chương trình được thực hiện lần lượt theo thứ tự từ trên xuống dưới.',
        'Cần sắp xếp các lệnh theo đúng trình tự để nhân vật thực hiện đúng yêu cầu.'
      ]
    },
    teacherNotes: 'Nhấn mạnh quy trình 7 bước tạo chương trình theo SGK Tin học 4. Cho học sinh tự trải nghiệm sự khác biệt khi hoán đổi vị trí hai khối lệnh để khắc sâu nguyên tắc "thứ tự thực hiện".',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể vào nhóm Âm thanh để ghép thêm khối [phát âm thanh Meow] giúp chương trình sinh động hơn.',
    xpReward: 35,
    nextLessonId: 'grade4_lesson15'
  },

  // -------------------------------------------------------------------------
  // BÀI 15. TẠO CHƯƠNG TRÌNH ĐỂ DIỄN TẢ Ý TƯỞNG
  // -------------------------------------------------------------------------
  {
    id: 'grade4_lesson15',
    grade: 4,
    lessonNumber: 15,
    title: 'BÀI 15. TẠO CHƯƠNG TRÌNH ĐỂ DIỄN TẢ Ý TƯỞNG',
    themeTitle: 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Biết cách chuyển một ý tưởng trong đời sống hoặc một câu chuyện nhỏ thành các bước cụ thể để lập trình.',
      do: 'Thực hiện được các bước: xác định ý tưởng, xác định công việc cần làm, xác định nhân vật, phông nền, các bước thực hiện và chọn lệnh phù hợp.',
      thinking: 'Phát triển tư duy phân tích: biết chia một ý tưởng lớn thành các công việc nhỏ nối tiếp nhau.'
    },
    keyKnowledge: {
      summary: 'Để diễn tả một ý tưởng bằng chương trình máy tính, ta không thể vội vàng ghép lệnh ngay mà cần phân tích ý tưởng thành các bước rõ ràng trước khi lập trình.',
      points: [
        { title: 'Bước 1: Xác định ý tưởng', desc: 'Em muốn kể câu chuyện gì? Nhân vật sẽ làm gì trên sân khấu?', icon: '💡' },
        { title: 'Bước 2: Xác định nhân vật & phông nền', desc: 'Chọn nhân vật phù hợp (ví dụ: Chú Mèo, Chú Chó) và chọn phông nền sân khấu tương ứng (ví dụ: Trường học, Bãi cỏ).', icon: '🏞️' },
        { title: 'Bước 3: Xác định các bước thực hiện', desc: 'Liệt kê từng hành động cụ thể theo đúng thứ tự: Nhân vật xuất hiện ở đâu? Nói gì trước? Đi đến đâu tiếp theo?', icon: '📋' },
        { title: 'Bước 4: Lựa chọn lệnh phù hợp', desc: 'Tìm trong các nhóm lệnh những khối lệnh tương ứng với từng hành động đã liệt kê.', icon: '🎯' },
        { title: 'Bước 5: Tạo chương trình và chạy thử', desc: 'Ghép các lệnh lại trong vùng lập trình, bấm Cờ xanh chạy thử và điều chỉnh nếu chưa như ý.', icon: '🚀' }
      ]
    },
    keywords: [
      { term: 'Ý tưởng', meaning: 'Suy nghĩ hoặc dự định về việc muốn nhân vật làm gì trên sân khấu.' },
      { term: 'Phông nền', meaning: 'Bức tranh cảnh nền đằng sau nhân vật trên sân khấu (sân trường, bầu trời, căn phòng,...).' },
      { term: 'Phân tích ý tưởng', meaning: 'Chia ý tưởng thành các việc cụ thể và sắp xếp theo thứ tự trước sau.' }
    ],
    observation: {
      title: 'Quan sát ý tưởng: Chú Mèo tập thể dục buổi sáng',
      description: 'Ý tưởng: Chú Mèo đứng trên bãi cỏ, nói "Chào buổi sáng!", sau đó nhảy sang phải 20 bước, rồi quay một góc để bắt đầu tập thể dục.',
      sampleBlocks: [
        { id: 'g4-15-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g4-15-b2', category: 'looks', text: 'nói "Chào buổi sáng!" trong 2 giây', shape: 'stack' },
        { id: 'g4-15-b3', category: 'motion', text: 'di chuyển 20 bước', shape: 'stack' },
        { id: 'g4-15-b4', category: 'motion', text: 'xoay ↷ 15 độ', shape: 'stack' }
      ],
      highlight: 'Từ ý tưởng ngôn ngữ đời thường ➔ thành danh sách các bước ➔ thành các khối lệnh Scratch!'
    },
    exploration: {
      title: 'Tìm hiểu cách chia nhỏ công việc từ ý tưởng',
      question: 'Nếu em có ý tưởng: "Chú Mèo giới thiệu tên trường của mình rồi đi vào lớp học", em sẽ chia thành những bước nào?',
      interactivePoints: [
        'Bước 1: Bắt đầu khi bấm Cờ xanh.',
        'Bước 2: Mèo nói "Chào bạn, tớ học trường Tiểu học Kim Đồng!" trong 2 giây.',
        'Bước 3: Mèo bước tới 30 bước về phía cửa lớp.',
        'Bước 4: Mèo nói "Tớ vào lớp đây!" trong 2 giây.'
      ]
    },
    practice: {
      title: 'Thực hành: Diễn tả ý tưởng Mèo giới thiệu bản thân',
      goal: 'Tạo chương trình diễn tả ý tưởng: Mèo nói "Tớ là Mèo Scratch!", sau đó di chuyển 20 bước và nói "Rất vui được làm quen với bạn!".',
      steps: [
        'Bước 1: Kéo khối lệnh [khi bấm vào cờ xanh].',
        'Bước 2: Gắn khối [nói "Tớ là Mèo Scratch!" trong 2 giây].',
        'Bước 3: Gắn khối [di chuyển 20 bước].',
        'Bước 4: Gắn khối [nói "Rất vui được làm quen với bạn!" trong 2 giây].',
        'Bước 5: Chạy thử và đối chiếu xem chương trình đã thể hiện đúng ý tưởng chưa.'
      ],
      initialBlocks: [
        { id: 'p4-15-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p4-15-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p4-15-2', category: 'looks', text: 'nói "Tớ là Mèo Scratch!" trong 2 giây', shape: 'stack' },
        { id: 'p4-15-3', category: 'motion', text: 'di chuyển 20 bước', shape: 'stack' },
        { id: 'p4-15-4', category: 'looks', text: 'nói "Rất vui được làm quen với bạn!" trong 2 giây', shape: 'stack' }
      ],
      hint: 'Hãy đọc lại từng câu trong ý tưởng ban đầu và kiểm tra xem mỗi câu đã có khối lệnh tương ứng chưa.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Chú Mèo lần lượt nói câu giới thiệu thứ nhất, bước tới 20 bước, rồi nói câu chào kết thúc.',
      partialCriteria: 'Thiếu bước: Mèo mới chỉ nói câu đầu tiên hoặc thiếu khối di chuyển ở giữa.',
      reviewAdvice: 'Hãy xem lại danh sách các bước và bổ sung khối lệnh còn thiếu vào giữa chương trình.'
    },
    summary: {
      takeaways: [
        'Để diễn tả ý tưởng, ta cần: xác định ý tưởng ➔ xác định nhân vật, phông nền ➔ xác định các bước ➔ chọn lệnh ➔ tạo và chạy thử chương trình.',
        'Mỗi bước trong ý tưởng sẽ được diễn tả bằng một hoặc nhiều khối lệnh phù hợp.',
        'Luôn chạy thử để kiểm tra xem chương trình có thể hiện đúng ý tưởng ban đầu hay không.'
      ]
    },
    teacherNotes: 'Rèn cho học sinh thói quen tư duy "từ ý tưởng đến kịch bản rồi mới đến khối lệnh". Không để học sinh kéo lệnh tùy hứng mà phải biết giải thích "khối lệnh này thể hiện hành động nào của ý tưởng".',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể nháy vào nút Phông nền ở góc dưới bên phải để chọn một bức tranh sân trường đẹp mắt làm nền cho câu chuyện.',
    xpReward: 40,
    nextLessonId: 'grade4_lesson16'
  },

  // -------------------------------------------------------------------------
  // BÀI 16. TẠO CHƯƠNG TRÌNH ĐƠN GIẢN
  // -------------------------------------------------------------------------
  {
    id: 'grade4_lesson16',
    grade: 4,
    lessonNumber: 16,
    title: 'BÀI 16. TẠO CHƯƠNG TRÌNH ĐƠN GIẢN',
    themeTitle: 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Củng cố toàn diện kỹ năng tạo chương trình đơn giản theo các yêu cầu bài học trong SGK Tin học 4.',
      do: 'Tự lập trình được chương trình hoàn chỉnh: chọn nhân vật, lựa chọn lệnh, ghép lệnh, chạy thử, quan sát kết quả và tự điều chỉnh khi phát hiện chưa phù hợp.',
      thinking: 'Hình thành năng lực tự kiểm thử và sửa đổi (test & debug cơ bản) ở mức độ học sinh lớp 4.'
    },
    keyKnowledge: {
      summary: 'Tạo chương trình đơn giản là hoạt động thực hành tổng hợp giúp em áp dụng toàn bộ kiến thức đã học ở Lớp 4 để giải quyết một nhiệm vụ trọn vẹn.',
      points: [
        { title: 'Xác định rõ yêu cầu', desc: 'Đọc kỹ đề bài xem nhân vật cần thực hiện những hành động nào và theo thứ tự nào.', icon: '🎯' },
        { title: 'Lựa chọn và sắp xếp lệnh', desc: 'Tìm đúng nhóm lệnh (Sự kiện, Chuyển động, Hiển thị) và ghép chúng theo đúng trình tự nhiệm vụ.', icon: '🧩' },
        { title: 'Quan sát và điều chỉnh', desc: 'Nếu nhân vật chạy quá nhanh, nói chưa đúng câu hoặc đi sai hướng, em hãy tách khối lệnh ra và sửa lại thông số.', icon: '🔍' }
      ]
    },
    keywords: [
      { term: 'Chương trình đơn giản', meaning: 'Chương trình gồm một chuỗi các lệnh tuần tự cơ bản thực hiện một hoạt ảnh hoặc tình huống ngắn.' },
      { term: 'Điều chỉnh chương trình', meaning: 'Thay đổi khối lệnh, thứ tự hoặc thông số bên trong lệnh khi chương trình chưa đúng yêu cầu.' }
    ],
    observation: {
      title: 'Quan sát chương trình: Mèo đi dạo và kêu Meow',
      description: 'Nhiệm vụ: Khi bấm cờ xanh, chú Mèo bước 20 bước, nói "Meow meow!", rồi bước tiếp 20 bước nữa.',
      sampleBlocks: [
        { id: 'g4-16-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g4-16-b2', category: 'motion', text: 'di chuyển 20 bước', shape: 'stack' },
        { id: 'g4-16-b3', category: 'looks', text: 'nói "Meow meow!" trong 2 giây', shape: 'stack' },
        { id: 'g4-16-b4', category: 'motion', text: 'di chuyển 20 bước', shape: 'stack' }
      ],
      highlight: 'Nhân vật vừa đi vừa biểu diễn theo đúng chuỗi hành động được dặn dò!'
    },
    exploration: {
      title: 'Tìm hiểu cách điều chỉnh khi chương trình chưa như ý',
      question: 'Nếu chú Mèo đi quá ngắn, chỉ nhích một chút xíu, em sẽ làm thế nào để chú Mèo đi xa hơn?',
      interactivePoints: [
        'Em nháy chuột vào số 10 bên trong khối [di chuyển 10 bước] và gõ số lớn hơn như 30 hoặc 50.',
        'Sau khi sửa thông số, nháy vào Cờ xanh để kiểm tra lại ngay lập tức.',
        'Thao tác thử nghiệm và điều chỉnh là kỹ năng rất quan trọng của người lập trình.'
      ]
    },
    practice: {
      title: 'Thực hành: Tự tạo chương trình Chú Mèo đi dạo',
      goal: 'Tạo chương trình theo yêu cầu: Mèo đi 30 bước, nói "Thời tiết hôm nay thật đẹp!" trong 2 giây, rồi quay sang phải 15 độ.',
      steps: [
        'Bước 1: Kéo khối lệnh [khi bấm vào cờ xanh].',
        'Bước 2: Gắn khối [di chuyển 10 bước] và sửa số 10 thành 30.',
        'Bước 3: Gắn khối [nói "Xin chào!" trong 2 giây] và sửa nội dung thành "Thời tiết hôm nay thật đẹp!".',
        'Bước 4: Gắn khối [xoay ↷ 15 độ].',
        'Bước 5: Bấm Cờ xanh và quan sát xem Chú Mèo đã hoàn thành nhiệm vụ chưa.'
      ],
      initialBlocks: [
        { id: 'p4-16-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p4-16-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p4-16-2', category: 'motion', text: 'di chuyển 30 bước', shape: 'stack' },
        { id: 'p4-16-3', category: 'looks', text: 'nói "Thời tiết hôm nay thật đẹp!" trong 2 giây', shape: 'stack' },
        { id: 'p4-16-4', category: 'motion', text: 'xoay ↷ 15 độ', shape: 'stack' }
      ],
      hint: 'Hãy chú ý sửa nội dung chữ và số bên trong khối lệnh cho đúng với yêu cầu bài tập.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Mèo bước đi 30 bước, hiển thị đúng câu nói trong 2 giây và nghiêng xoay 15 độ.',
      partialCriteria: 'Chưa sửa thông số: Mèo vẫn đi 10 bước hoặc vẫn nói câu mặc định "Xin chào!".',
      reviewAdvice: 'Hãy nháy chuột vào ô tròn màu trắng bên trong khối lệnh để gõ lại đúng thông số yêu cầu.'
    },
    summary: {
      takeaways: [
        'Quy trình tạo chương trình đơn giản gồm: Xác định yêu cầu ➔ Chọn lệnh ➔ Ghép chương trình ➔ Chạy thử ➔ Quan sát và điều chỉnh.',
        'Có thể chỉnh sửa các con số và văn bản bên trong khối lệnh để nhân vật hành động đúng ý muốn.',
        'Hoàn thành chương trình đơn giản là bước đệm tuyệt vời để em sẵn sàng khám phá các cấu trúc nâng cao ở Lớp 5!'
      ]
    },
    teacherNotes: 'Đánh giá mức độ thành thạo của học sinh lớp 4 về thao tác ghép khối, chỉnh sửa tham số trong khối lệnh và tự phát hiện sai sót nhỏ khi chạy thử.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể vào nhóm Điều khiển để dùng khối [đợi 1 giây] đặt giữa các hành động giúp nhân vật chuyển động nhịp nhàng hơn.',
    xpReward: 45,
    nextLessonId: 'grade5_lesson10'
  },

  // =========================================================================
  // LỚP 5: SGK TIN HỌC 5 – BỘ KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
  // =========================================================================

  // -------------------------------------------------------------------------
  // BÀI 10. CẤU TRÚC TUẦN TỰ
  // -------------------------------------------------------------------------
  {
    id: 'grade5_lesson10',
    grade: 5,
    lessonNumber: 10,
    title: 'BÀI 10. CẤU TRÚC TUẦN TỰ',
    themeTitle: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Hiểu khái niệm cấu trúc tuần tự theo đúng định nghĩa của SGK Tin học 5: các lệnh được thực hiện lần lượt theo đúng trình tự từ trên xuống dưới.',
      do: 'Xác định được thứ tự các bước trong một công việc đời thường và mô tả được một chương trình Scratch theo cấu trúc tuần tự.',
      thinking: 'Phát triển tư duy logic về tính thứ tự: thứ tự trước sau của các lệnh quyết định kết quả của chương trình.'
    },
    keyKnowledge: {
      summary: 'Cấu trúc tuần tự là cấu trúc cơ bản nhất trong lập trình, trong đó các lệnh được máy tính thực hiện lần lượt từng lệnh một, từ lệnh đầu tiên đến lệnh cuối cùng theo đúng thứ tự đã sắp đặt.',
      points: [
        { title: 'Cấu trúc tuần tự là gì?', desc: 'Là cấu trúc điều khiển mà các hành động hay lệnh được thực hiện lần lượt nối tiếp nhau theo một trình tự xác định.', icon: '➡️' },
        { title: 'Ví dụ trong đời sống', desc: 'Quy trình đánh răng (Lấy bàn chải ➔ Tra kem ➔ Chải răng ➔ Súc miệng) là một ví dụ quen thuộc về cấu trúc tuần tự.', icon: '🪥' },
        { title: 'Trình tự thực hiện trong Scratch', desc: 'Các khối lệnh gắn liền nhau từ trên xuống dưới sẽ được máy tính chạy theo đúng thứ tự từ trên xuống, không bỏ sót lệnh nào.', icon: '⬇️' }
      ]
    },
    keywords: [
      { term: 'Cấu trúc tuần tự', meaning: 'Cấu trúc chương trình mà trong đó các lệnh được thực hiện lần lượt theo đúng thứ tự từ trên xuống dưới.' },
      { term: 'Trình tự', meaning: 'Thứ tự trước sau đã được sắp xếp sẵn của các bước hoặc các lệnh.' }
    ],
    observation: {
      title: 'Quan sát chương trình có cấu trúc tuần tự',
      description: 'Chương trình Chú Mèo đi qua 3 vị trí trên sân khấu: bắt đầu bằng Cờ xanh ➔ di chuyển 30 bước ➔ đợi 1 giây ➔ di chuyển tiếp 30 bước ➔ nói "Đã đến nơi!" trong 2 giây.',
      sampleBlocks: [
        { id: 'g5-10-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g5-10-b2', category: 'motion', text: 'di chuyển 30 bước', shape: 'stack' },
        { id: 'g5-10-b3', category: 'control', text: 'đợi 1 giây', shape: 'stack' },
        { id: 'g5-10-b4', category: 'motion', text: 'di chuyển 30 bước', shape: 'stack' },
        { id: 'g5-10-b5', category: 'looks', text: 'nói "Đã đến nơi!" trong 2 giây', shape: 'stack' }
      ],
      highlight: 'Tất cả các lệnh được thực hiện lần lượt, không có bước nào bị nhảy cóc!'
    },
    exploration: {
      title: 'Tìm hiểu tính nghiêm ngặt của cấu trúc tuần tự',
      question: 'Nếu ta đổi lệnh [nói "Đã đến nơi!" trong 2 giây] lên ngay sau lệnh cờ xanh thì kết quả có còn đúng ý nghĩa không?',
      interactivePoints: [
        'Mèo sẽ nói "Đã đến nơi!" ngay khi vừa mới bắt đầu xuất phát, điều này hoàn toàn sai với thực tế.',
        'Trong cấu trúc tuần tự, trật tự các bước rất quan trọng: bước nào làm trước, bước nào làm sau.',
        'Mô tả đúng trình tự là chìa khóa để viết chương trình chính xác.'
      ]
    },
    practice: {
      title: 'Thực hành: Xây dựng chương trình vẽ đoạn thẳng theo tuần tự',
      goal: 'Tạo chương trình theo cấu trúc tuần tự: Đặt nhân vật ở vị trí ban đầu, di chuyển 40 bước, xoay 90 độ, rồi di chuyển tiếp 40 bước.',
      steps: [
        'Bước 1: Kéo khối lệnh [khi bấm vào cờ xanh].',
        'Bước 2: Gắn khối [di chuyển 40 bước].',
        'Bước 3: Gắn khối [xoay ↷ 90 độ].',
        'Bước 4: Gắn khối [di chuyển 40 bước].',
        'Bước 5: Bấm Cờ xanh để kiểm tra xem nhân vật có đi theo hình chữ L theo đúng tuần tự không.'
      ],
      initialBlocks: [
        { id: 'p5-10-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p5-10-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p5-10-2', category: 'motion', text: 'di chuyển 40 bước', shape: 'stack' },
        { id: 'p5-10-3', category: 'motion', text: 'xoay ↷ 90 độ', shape: 'stack' },
        { id: 'p5-10-4', category: 'motion', text: 'di chuyển 40 bước', shape: 'stack' }
      ],
      hint: 'Hãy nhớ rằng mỗi lệnh chỉ chạy sau khi lệnh phía trên nó đã hoàn thành.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Nhân vật đi thẳng 40 bước, quay góc vuông 90 độ rồi đi tiếp 40 bước.',
      partialCriteria: 'Sai thứ tự: Khối xoay bị đặt sai vị trí khiến nhân vật quay trước khi đi.',
      reviewAdvice: 'Hãy đọc lại từng dòng theo thứ tự từ trên xuống dưới để sắp xếp lại cho đúng trình tự.'
    },
    summary: {
      takeaways: [
        'Cấu trúc tuần tự là cấu trúc trong đó các lệnh được thực hiện lần lượt từ trên xuống dưới.',
        'Thứ tự sắp xếp các lệnh quyết định kết quả của chương trình.',
        'Cần xác định chính xác trình tự các bước trước khi ghép lệnh vào vùng lập trình.'
      ]
    },
    teacherNotes: 'Sử dụng đúng thuật ngữ "cấu trúc tuần tự" theo SGK Tin học 5. Không dùng các từ ngữ không chuẩn như "chạy lần lượt" để thay thế thuật ngữ khoa học.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể thêm lệnh [đặt hướng bằng 90] ở đầu chương trình để đảm bảo nhân vật luôn xuất phát theo hướng sang phải.',
    xpReward: 35,
    nextLessonId: 'grade5_lesson11'
  },

  // -------------------------------------------------------------------------
  // BÀI 11. CẤU TRÚC LẶP
  // -------------------------------------------------------------------------
  {
    id: 'grade5_lesson11',
    grade: 5,
    lessonNumber: 11,
    title: 'BÀI 11. CẤU TRÚC LẶP',
    themeTitle: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Nhận biết được những công việc có tính chất lặp lại trong đời sống; hiểu khái niệm cấu trúc lặp theo SGK Tin học 5.',
      do: 'Nhận biết được lệnh lặp [lặp lại ... lần] trong Scratch; biết cách đặt các lệnh cần lặp vào bên trong khối lặp.',
      thinking: 'Hình thành tư duy tối ưu hóa: thay vì viết nhiều lệnh giống hệt nhau, ta gom chúng vào cấu trúc lặp giúp chương trình ngắn gọn và dễ hiểu hơn.'
    },
    keyKnowledge: {
      summary: 'Cấu trúc lặp là cấu trúc điều khiển cho phép thực hiện lặp đi lặp lại một hoặc nhiều lệnh theo số lần xác định hoặc cho đến khi thỏa mãn một điều kiện.',
      points: [
        { title: 'Nhận biết công việc lặp lại', desc: 'Khi một hành động được làm đi làm lại nhiều lần (ví dụ: vỗ tay 5 lần, đi bộ 10 bước), đó là công việc có cấu trúc lặp.', icon: '🔄' },
        { title: 'Lợi ích của cấu trúc lặp', desc: 'Giúp chương trình ngắn gọn hơn rất nhiều. Thay vì ghép 10 khối lệnh giống nhau, ta chỉ cần 1 khối lặp 10 lần.', icon: '⚡' },
        { title: 'Khối lệnh [lặp lại ... lần]', desc: 'Thuộc nhóm Điều khiển (màu cam). Các lệnh đặt bên trong "vòng tay" của khối lặp sẽ được thực hiện lặp lại.', icon: '🔁' }
      ]
    },
    keywords: [
      { term: 'Cấu trúc lặp', meaning: 'Cấu trúc điều khiển trong đó một khối lệnh được thực hiện lặp đi lặp lại nhiều lần.' },
      { term: 'Số lần lặp', meaning: 'Con số quy định hành động bên trong khối lặp sẽ được lặp lại bao nhiêu lần.' },
      { term: 'Lệnh lặp', meaning: 'Khối lệnh dùng để điều khiển sự lặp lại (như khối [lặp lại 10 lần] trong nhóm Điều khiển).' }
    ],
    observation: {
      title: 'So sánh chương trình không dùng lặp và có dùng lặp',
      description: 'Để vẽ hình vuông 4 cạnh: Không dùng lặp cần ghép 4 cặp lệnh [di chuyển 50 bước] và [xoay 90 độ] (tổng cộng 8 khối). Dùng cấu trúc lặp chỉ cần 1 khối [lặp lại 4 lần] ôm lấy 2 khối lệnh bên trong!',
      sampleBlocks: [
        { id: 'g5-11-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g5-11-b2', category: 'control', text: 'lặp lại 4 lần', shape: 'c-block', explanation: 'Thực hiện 4 lần các lệnh đặt bên trong' },
        { id: 'g5-11-b3', category: 'motion', text: 'di chuyển 50 bước', shape: 'stack' },
        { id: 'g5-11-b4', category: 'motion', text: 'xoay ↷ 90 độ', shape: 'stack' }
      ],
      highlight: 'Cấu trúc lặp giúp chương trình ngắn hơn, thông minh hơn và ít lỗi hơn!'
    },
    exploration: {
      title: 'Tìm hiểu cơ chế chạy của khối lặp',
      question: 'Khi máy tính gặp khối [lặp lại 4 lần], máy tính sẽ làm gì với các khối lệnh bên trong?',
      interactivePoints: [
        'Máy tính chạy lần lượt các khối bên trong từ trên xuống dưới.',
        'Khi chạy hết lệnh cuối cùng bên trong, nó quay ngược lên đầu khối lặp để chạy lại.',
        'Quá trình này lặp lại đủ 4 lần thì máy tính mới thoát ra và chạy các lệnh ở phía dưới khối lặp.'
      ]
    },
    practice: {
      title: 'Thực hành: Gom các lệnh lặp lại vào khối [lặp lại ... lần]',
      goal: 'Tạo chương trình cho chú Mèo bước đi 3 nhịp: mỗi nhịp gồm bước 20 bước và đợi 0.5 giây.',
      steps: [
        'Bước 1: Kéo khối [khi bấm vào cờ xanh].',
        'Bước 2: Chọn nhóm Điều khiển (màu cam), kéo khối [lặp lại 10 lần] vào và sửa số 10 thành 3.',
        'Bước 3: Chọn nhóm Chuyển động, kéo khối [di chuyển 20 bước] đặt vào bên trong khối lặp.',
        'Bước 4: Chọn nhóm Điều khiển, kéo khối [đợi 1 giây] đặt vào bên trong khối lặp và sửa thành 0.5 giây.',
        'Bước 5: Bấm Cờ xanh và đếm xem chú Mèo có bước đủ 3 nhịp không.'
      ],
      initialBlocks: [
        { id: 'p5-11-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p5-11-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p5-11-2', category: 'control', text: 'lặp lại 3 lần', shape: 'c-block' },
        { id: 'p5-11-3', category: 'motion', text: 'di chuyển 20 bước', shape: 'stack' },
        { id: 'p5-11-4', category: 'control', text: 'đợi 0.5 giây', shape: 'stack' }
      ],
      hint: 'Hãy chú ý: Cả hai khối [di chuyển] và [đợi] đều phải nằm gọn bên trong chiếc miệng của khối [lặp lại].'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Chú Mèo thực hiện đúng 3 lần chuỗi hành động bước 20 bước và nghỉ 0.5 giây.',
      partialCriteria: 'Khối lệnh nằm ngoài: Khối [đợi] bị gắn ra phía ngoài khối lặp khiến Mèo bước liền một mạch rồi mới đợi.',
      reviewAdvice: 'Hãy kéo khối [đợi] thả vào ngay bên dưới khối [di chuyển] ở bên trong khối [lặp lại].'
    },
    summary: {
      takeaways: [
        'Cấu trúc lặp được dùng khi một hoặc nhiều lệnh cần được thực hiện nhiều lần.',
        'Khối lệnh [lặp lại ... lần] trong nhóm Điều khiển giúp điều khiển số lần lặp xác định.',
        'Sử dụng cấu trúc lặp giúp chương trình ngắn gọn, rõ ràng và khoa học hơn.'
      ]
    },
    teacherNotes: 'Sử dụng đúng thuật ngữ "cấu trúc lặp" theo SGK Tin học 5. Nhấn mạnh việc xác định "hành động nào được lặp lại" và "lặp lại bao nhiêu lần" trước khi ghép khối lệnh.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Ngoài lặp theo số lần xác định, trong nhóm Điều khiển còn có khối [liên tục] dùng để lặp mãi mãi cho đến khi bấm nút đỏ.',
    xpReward: 40,
    nextLessonId: 'grade5_lesson12'
  },

  // -------------------------------------------------------------------------
  // BÀI 12. THỰC HÀNH LỆNH LẶP
  // -------------------------------------------------------------------------
  {
    id: 'grade5_lesson12',
    grade: 5,
    lessonNumber: 12,
    title: 'BÀI 12. THỰC HÀNH LỆNH LẶP',
    themeTitle: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Củng cố hiểu biết về cấu trúc lặp thông qua các bài toán thực hành cụ thể trong SGK Tin học 5.',
      do: 'Sử dụng thành thạo lệnh lặp theo yêu cầu; tạo chương trình, chạy thử, quan sát kết quả và điều chỉnh số lần lặp hoặc các thông số bên trong vòng lặp.',
      thinking: 'Rèn luyện khả năng phát hiện mẫu lặp (pattern recognition) trong các bài toán hình học hoặc chuyển động.'
    },
    keyKnowledge: {
      summary: 'Thực hành lệnh lặp giúp em làm chủ việc kết hợp lệnh lặp với các lệnh chuyển động, hiển thị và âm thanh để tạo ra những hiệu ứng chuyển động nhịp nhàng hoặc hình vẽ đều đặn.',
      points: [
        { title: 'Xác định hành động lặp', desc: 'Tìm ra cụm lệnh cốt lõi được lặp lại nhiều lần trong bài toán.', icon: '🎯' },
        { title: 'Xác định số lần lặp', desc: 'Tính toán chính xác số lần cần lặp (ví dụ: tam giác đều lặp 3 lần, hình vuông lặp 4 lần, lục giác lặp 6 lần).', icon: '🔢' },
        { title: 'Kiểm tra và tinh chỉnh', desc: 'Nếu nhân vật quay chưa đủ một vòng tròn hoặc chuyển động bị lệch, ta cần điều chỉnh lại góc xoay hoặc số lần lặp.', icon: '🔧' }
      ]
    },
    keywords: [
      { term: 'Thực hành lệnh lặp', meaning: 'Vận dụng cấu trúc lặp vào việc tạo ra các chương trình chuyển động hoặc hình vẽ cụ thể.' },
      { term: 'Mẫu lặp', meaning: 'Tập hợp các bước được lặp đi lặp lại giống hệt nhau trong một quá trình.' }
    ],
    observation: {
      title: 'Quan sát nhân vật bước đi tuần tra qua lại',
      description: 'Chương trình cho chú Mèo đi tuần tra: lặp lại 5 lần việc [di chuyển 30 bước, đợi 0.3 giây, đổi trang phục kế tiếp].',
      sampleBlocks: [
        { id: 'g5-12-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g5-12-b2', category: 'control', text: 'lặp lại 5 lần', shape: 'c-block' },
        { id: 'g5-12-b3', category: 'motion', text: 'di chuyển 30 bước', shape: 'stack' },
        { id: 'g5-12-b4', category: 'looks', text: 'trang phục kế tiếp', shape: 'stack' },
        { id: 'g5-12-b5', category: 'control', text: 'đợi 0.3 giây', shape: 'stack' }
      ],
      highlight: 'Nhờ cấu trúc lặp và đổi trang phục, chú Mèo bước đi sống động như phim hoạt hình!'
    },
    exploration: {
      title: 'Khám phá sự thay đổi khi tăng số lần lặp',
      question: 'Nếu em tăng số lần lặp từ 5 lên 10, chú Mèo sẽ đi như thế nào?',
      interactivePoints: [
        'Chú Mèo sẽ đi quãng đường dài gấp đôi so với ban đầu.',
        'Thời gian thực hiện chương trình cũng sẽ tăng lên tương ứng.',
        'Điều này chứng tỏ số lần lặp kiểm soát trực tiếp độ dài của quá trình.'
      ]
    },
    practice: {
      title: 'Thực hành: Lập trình Chú Mèo vỗ tay và nói đếm số',
      goal: 'Tạo chương trình lặp lại 4 lần: nói lần lượt các số từ 1 đến 4, mỗi lần bước 15 bước.',
      steps: [
        'Bước 1: Kéo khối [khi bấm vào cờ xanh].',
        'Bước 2: Kéo khối [lặp lại 4 lần] trong nhóm Điều khiển.',
        'Bước 3: Đặt khối [di chuyển 15 bước] vào bên trong khối lặp.',
        'Bước 4: Đặt khối [nói "1, 2, 3, 4!" trong 1 giây] vào bên trong khối lặp.',
        'Bước 5: Chạy thử chương trình và quan sát nhịp điệu của chú Mèo.'
      ],
      initialBlocks: [
        { id: 'p5-12-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p5-12-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p5-12-2', category: 'control', text: 'lặp lại 4 lần', shape: 'c-block' },
        { id: 'p5-12-3', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack' },
        { id: 'p5-12-4', category: 'looks', text: 'nói "1, 2, 3, 4!" trong 1 giây', shape: 'stack' }
      ],
      hint: 'Hãy kiểm tra kỹ để đảm bảo tất cả các khối lệnh hành động đều nằm trọn vẹn trong khối lặp lại.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Chú Mèo thực hiện đúng 4 lần chu kỳ: vừa bước 15 bước vừa hiển thị lời nói.',
      partialCriteria: 'Sai số lần lặp: Chương trình vẫn để mặc định là 10 lần thay vì 4 lần.',
      reviewAdvice: 'Hãy nháy chuột vào ô số trong khối [lặp lại ...] và gõ đúng số 4 theo yêu cầu đề bài.'
    },
    summary: {
      takeaways: [
        'Thực hành lệnh lặp giúp tạo ra các chuyển động tuần hoàn và hoạt ảnh mượt mà.',
        'Cần đặt đúng các lệnh bên trong khối lặp và chỉnh số lần lặp chính xác.',
        'Luôn chạy thử và quan sát kỹ lưỡng để điều chỉnh các thông số phù hợp.'
      ]
    },
    teacherNotes: 'Cho học sinh thực hành nhiều bài toán đa dạng để củng cố kỹ năng đặt khối lệnh vào bên trong c-block của lệnh lặp. Khuyến khích học sinh thử nghiệm thay đổi các con số để tự cảm nhận kết quả.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể kết hợp khối lệnh [bật lại nếu chạm cạnh] trong nhóm Chuyển động để chú Mèo không bị đi ra ngoài màn hình.',
    xpReward: 40,
    nextLessonId: 'grade5_lesson13'
  },

  // -------------------------------------------------------------------------
  // BÀI 13. CẤU TRÚC RẼ NHÁNH
  // -------------------------------------------------------------------------
  {
    id: 'grade5_lesson13',
    grade: 5,
    lessonNumber: 13,
    title: 'BÀI 13. CẤU TRÚC RẼ NHÁNH',
    themeTitle: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Hiểu khái niệm cấu trúc rẽ nhánh theo đúng định nghĩa của SGK Tin học 5; nhận biết điều kiện và hai trường hợp: Điều kiện đúng (thỏa mãn) và Điều kiện sai (không thỏa mãn).',
      do: 'Sử dụng được khối lệnh [nếu <điều kiện> thì] và [nếu <điều kiện> thì ... nếu không thì] phù hợp với nhiệm vụ được giao.',
      thinking: 'Phát triển tư duy ra quyết định (decision making): máy tính biết chọn con đường thực hiện lệnh dựa trên việc kiểm tra điều kiện.'
    },
    keyKnowledge: {
      summary: 'Cấu trúc rẽ nhánh là cấu trúc điều khiển trong đó việc thực hiện một khối lệnh phụ thuộc vào một điều kiện: nếu điều kiện được thỏa mãn thì thực hiện lệnh, ngược lại thì không thực hiện hoặc thực hiện lệnh khác.',
      points: [
        { title: 'Điều kiện là gì?', desc: 'Điều kiện là một sự việc hoặc biểu thức có thể ĐÚNG hoặc SAI (ví dụ: "Trời có mưa không?", "Điểm số có lớn hơn 5 không?").', icon: '❓' },
        { title: 'Cấu trúc rẽ nhánh dạng thiếu', desc: 'Dạng "Nếu <điều kiện> thì <lệnh>": Chỉ thực hiện lệnh khi điều kiện ĐÚNG. Nếu điều kiện SAI thì bỏ qua.', icon: '🔀' },
        { title: 'Cấu trúc rẽ nhánh dạng đủ', desc: 'Dạng "Nếu <điều kiện> thì <lệnh 1> nếu không thì <lệnh 2>": Nếu ĐÚNG làm lệnh 1; nếu SAI làm lệnh 2.', icon: '⚖️' },
        { title: 'Khối lệnh trong Scratch', desc: 'Khối rẽ nhánh nằm trong nhóm Điều khiển (màu cam). Ô chứa điều kiện có hình lục giác sắc cạnh.', icon: '🧩' }
      ]
    },
    keywords: [
      { term: 'Cấu trúc rẽ nhánh', meaning: 'Cấu trúc điều khiển mà việc thực hiện các lệnh phụ thuộc vào kết quả kiểm tra một điều kiện.' },
      { term: 'Điều kiện', meaning: 'Phát biểu hoặc phép so sánh chỉ nhận một trong hai giá trị: Đúng hoặc Sai.' },
      { term: 'Nếu – thì', meaning: 'Cấu trúc rẽ nhánh dạng thiếu: chỉ thực hiện hành động khi điều kiện đúng.' },
      { term: 'Nếu – thì – nếu không thì', meaning: 'Cấu trúc rẽ nhánh dạng đủ: thực hiện một trong hai nhánh lệnh tùy vào điều kiện đúng hay sai.' }
    ],
    observation: {
      title: 'Quan sát tình huống rẽ nhánh: Kiểm tra chạm cạnh sân khấu',
      description: 'Nếu Chú Mèo chạm vào cạnh sân khấu thì Mèo nói "Đã chạm mép rồi!" và quay đầu lại, nếu không chạm mép thì Mèo tiếp tục đi thẳng.',
      sampleBlocks: [
        { id: 'g5-13-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g5-13-b2', category: 'control', text: 'nếu <đang chạm cạnh?> thì', shape: 'c-block', explanation: 'Kiểm tra điều kiện chạm cạnh sân khấu' },
        { id: 'g5-13-b3', category: 'looks', text: 'nói "Đã chạm mép rồi!" trong 2 giây', shape: 'stack' }
      ],
      highlight: 'Nhờ cấu trúc rẽ nhánh, nhân vật biết ứng biến thông minh theo từng tình huống!'
    },
    exploration: {
      title: 'Tìm hiểu sự khác biệt giữa dạng thiếu và dạng đủ',
      question: 'Khi cô giáo dặn: "Nếu trời mưa thì mang ô, nếu không thì đội mũ nan", đây là dạng thiếu hay dạng đủ?',
      interactivePoints: [
        'Đây là cấu trúc rẽ nhánh dạng đủ vì cả hai trường hợp (trời mưa và trời không mưa) đều có hành động tương ứng rõ ràng.',
        'Dạng thiếu chỉ có 1 hành động: "Nếu trời mưa thì mang ô" (nếu không mưa thì không làm gì cả).',
        'Trong Scratch, khối dạng đủ có hai ngăn: ngăn [thì] và ngăn [nếu không thì].'
      ]
    },
    practice: {
      title: 'Thực hành: Lập trình Mèo kiểm tra phím bấm',
      goal: 'Tạo chương trình sử dụng cấu trúc rẽ nhánh: Nếu phím [phím trắng được bấm?] thì Mèo nói "Bạn vừa bấm phím cách!" trong 2 giây.',
      steps: [
        'Bước 1: Kéo khối lệnh [khi bấm vào cờ xanh].',
        'Bước 2: Chọn nhóm Điều khiển, kéo khối [nếu < > thì].',
        'Bước 3: Chọn nhóm Cảm biến (màu lục lam), kéo khối lục giác [phím khoảng trắng được bấm?] đặt vào ô điều kiện.',
        'Bước 4: Chọn nhóm Hiển thị, kéo khối [nói "Bạn vừa bấm phím cách!" trong 2 giây] đặt vào bên trong khối rẽ nhánh.',
        'Bước 5: Bấm Cờ xanh, thử bấm hoặc không bấm phím cách trên bàn phím để quan sát phản ứng của chú Mèo.'
      ],
      initialBlocks: [
        { id: 'p5-13-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p5-13-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p5-13-2', category: 'control', text: 'nếu <phím khoảng trắng được bấm?> thì', shape: 'c-block' },
        { id: 'p5-13-3', category: 'looks', text: 'nói "Bạn vừa bấm phím cách!" trong 2 giây', shape: 'stack' }
      ],
      hint: 'Ô điều kiện hình lục giác nằm ngay sau chữ "nếu", em hãy thả đúng khối cảm biến vào ô đó nhé.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Khi phím khoảng trắng được bấm, Chú Mèo phát ra câu nói; khi không bấm phím, Chú Mèo không nói gì.',
      partialCriteria: 'Chưa gắn điều kiện: Khối rẽ nhánh còn để trống ô lục giác hoặc gắn khối tròn không đúng hình dạng.',
      reviewAdvice: 'Hãy vào nhóm Cảm biến để tìm đúng khối lục giác có góc nhọn hai đầu thả vào ô điều kiện.'
    },
    summary: {
      takeaways: [
        'Cấu trúc rẽ nhánh dùng để quyết định thực hiện lệnh tùy thuộc vào điều kiện đúng hay sai.',
        'Cấu trúc rẽ nhánh gồm hai dạng: dạng thiếu (Nếu – thì) và dạng đủ (Nếu – thì – nếu không thì).',
        'Điều kiện trong Scratch thường được lấy từ nhóm Cảm biến hoặc nhóm Các phép toán.'
      ]
    },
    teacherNotes: 'Sử dụng đúng thuật ngữ "cấu trúc rẽ nhánh", "điều kiện", "dạng thiếu", "dạng đủ" theo SGK Tin học 5. Nhấn mạnh việc kiểm tra điều kiện chỉ cho kết quả Đúng hoặc Sai.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Thông thường, khối rẽ nhánh được đặt bên trong khối [liên tục] để máy tính kiểm tra điều kiện liên tục trong suốt trò chơi.',
    xpReward: 45,
    nextLessonId: 'grade5_lesson14'
  },

  // -------------------------------------------------------------------------
  // BÀI 14. BIẾN
  // -------------------------------------------------------------------------
  {
    id: 'grade5_lesson14',
    grade: 5,
    lessonNumber: 14,
    title: 'BÀI 14. BIẾN',
    themeTitle: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Hiểu khái niệm biến theo đúng cách trình bày của SGK Tin học 5: biến là vùng nhớ được đặt tên dùng để lưu trữ dữ liệu có thể thay đổi trong quá trình thực hiện chương trình.',
      do: 'Biết cách tạo một biến mới, gán giá trị ban đầu cho biến, thay đổi giá trị của biến và quan sát giá trị hiển thị trên sân khấu.',
      thinking: 'Hình thành tư duy về biến số: biểu diễn các đại lượng thay đổi (như Điểm số, Số lượt chơi, Thời gian) trong bài toán.'
    },
    keyKnowledge: {
      summary: 'Biến là nơi lưu giữ thông tin mà máy tính có thể ghi nhớ, sử dụng và thay đổi giá trị trong suốt quá trình chạy chương trình.',
      points: [
        { title: 'Biến là gì?', desc: 'Hãy tưởng tượng biến như một chiếc hộp thần kỳ có dán nhãn tên (ví dụ dán nhãn "Điểm"). Bên trong hộp chứa một giá trị số hoặc chữ có thể thay đổi được.', icon: '📦' },
        { title: 'Tạo biến trong Scratch', desc: 'Vào nhóm Các biến (màu cam đậm), nháy nút "Tạo một biến" và đặt tên biến có ý nghĩa rõ ràng (như Điểm, Lượt chơi).', icon: '🏷️' },
        { title: 'Khởi tạo giá trị cho biến', desc: 'Khi bắt đầu chương trình, luôn phải đặt giá trị ban đầu cho biến bằng lệnh [đặt [Điểm] thành 0].', icon: '0️⃣' },
        { title: 'Thay đổi giá trị của biến', desc: 'Dùng lệnh [thay đổi [Điểm] một lượng 1] để tăng điểm số mỗi khi nhân vật làm được việc tốt.', icon: '➕' }
      ]
    },
    keywords: [
      { term: 'Biến', meaning: 'Vùng nhớ được đặt tên dùng để lưu trữ dữ liệu có thể thay đổi trong quá trình thực hiện chương trình.' },
      { term: 'Tên biến', meaning: 'Tên gọi đặt cho biến để phân biệt với các biến khác (ví dụ: Điểm, Thời gian).' },
      { term: 'Giá trị của biến', meaning: 'Dữ liệu cụ thể được lưu giữ bên trong biến tại một thời điểm.' },
      { term: 'Khởi tạo biến', meaning: 'Gán giá trị xuất phát ban đầu cho biến khi chương trình bắt đầu chạy.' }
    ],
    observation: {
      title: 'Quan sát biến Điểm số tăng lên khi Mèo bắt bóng',
      description: 'Trên góc sân khấu hiển thị ô "Điểm: 0". Khi Mèo chạm quả bóng, ô Điểm nhảy lên thành 1, rồi thành 2, 3...',
      sampleBlocks: [
        { id: 'g5-14-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g5-14-b2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack', explanation: 'Đặt giá trị ban đầu của biến Điểm bằng 0' },
        { id: 'g5-14-b3', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack', explanation: 'Tăng giá trị của biến Điểm thêm 1 đơn vị' },
        { id: 'g5-14-b4', category: 'looks', text: 'nói [Điểm] trong 2 giây', shape: 'stack', explanation: 'Hiển thị giá trị hiện tại của biến Điểm' }
      ],
      highlight: 'Biến giúp máy tính ghi nhớ và cập nhật thông tin liên tục!'
    },
    exploration: {
      title: 'Tìm hiểu tại sao phải khởi tạo biến về 0',
      question: 'Nếu em quên không dùng lệnh [đặt [Điểm] thành 0] ở đầu chương trình, điều gì sẽ xảy ra khi chơi ván mới?',
      interactivePoints: [
        'Điểm số của ván chơi trước sẽ bị giữ nguyên, ván mới không được tính từ đầu.',
        'Người chơi mới sẽ có sẵn số điểm cũ, trò chơi trở nên không công bằng và không chính xác.',
        'Vì vậy, khởi tạo giá trị ban đầu cho biến ở đầu chương trình là nguyên tắc bất di bất dịch!'
      ]
    },
    practice: {
      title: 'Thực hành: Tạo biến và tăng điểm khi bấm chuột',
      goal: 'Tạo một biến tên là "Số bước". Ban đầu đặt Số bước thành 0. Sau đó cho Mèo bước 10 bước và tăng Số bước thêm 10.',
      steps: [
        'Bước 1: Kéo khối lệnh [khi bấm vào cờ xanh].',
        'Bước 2: Chọn nhóm Các biến, kéo khối [đặt [Số bước] thành 0].',
        'Bước 3: Chọn nhóm Chuyển động, kéo khối [di chuyển 10 bước].',
        'Bước 4: Chọn nhóm Các biến, kéo khối [thay đổi [Số bước] một lượng 10].',
        'Bước 5: Bấm Cờ xanh và quan sát giá trị biến "Số bước" trên sân khấu nhảy từ 0 lên 10.'
      ],
      initialBlocks: [
        { id: 'p5-14-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p5-14-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p5-14-2', category: 'variables', text: 'đặt [Số bước] thành 0', shape: 'stack' },
        { id: 'p5-14-3', category: 'motion', text: 'di chuyển 10 bước', shape: 'stack' },
        { id: 'p5-14-4', category: 'variables', text: 'thay đổi [Số bước] một lượng 10', shape: 'stack' }
      ],
      hint: 'Nhớ phân biệt khối [đặt ... thành ...] (gán giá trị) và khối [thay đổi ... một lượng ...] (cộng dồn giá trị).'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Khi bấm Cờ xanh, biến Số bước được đặt về 0, Mèo di chuyển 10 bước và biến hiển thị giá trị 10.',
      partialCriteria: 'Dùng nhầm khối lệnh: Dùng khối đặt thay vì khối thay đổi khiến biến không tăng được theo mong muốn.',
      reviewAdvice: 'Hãy kiểm tra kỹ: Dùng [đặt ... thành 0] ở đầu và dùng [thay đổi ... một lượng] khi muốn tăng giá trị.'
    },
    summary: {
      takeaways: [
        'Biến là vùng nhớ dùng để lưu trữ dữ liệu có thể thay đổi trong quá trình thực hiện chương trình.',
        'Cần đặt tên biến rõ ràng, dễ nhớ và phù hợp với ý nghĩa của dữ liệu.',
        'Luôn khởi tạo giá trị ban đầu cho biến ở đầu chương trình bằng lệnh đặt giá trị.'
      ]
    },
    teacherNotes: 'Sử dụng đúng thuật ngữ "biến", "giá trị của biến", "khởi tạo biến" theo SGK Tin học 5. Giúp học sinh phân biệt rạch ròi giữa tên biến và giá trị chứa bên trong biến.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể nháy vào ô vuông bên cạnh tên biến trong danh sách khối lệnh để ẩn hoặc hiện bảng điểm trên sân khấu.',
    xpReward: 45,
    nextLessonId: 'grade5_lesson15'
  },

  // -------------------------------------------------------------------------
  // BÀI 15. BIỂU THỨC
  // -------------------------------------------------------------------------
  {
    id: 'grade5_lesson15',
    grade: 5,
    lessonNumber: 15,
    title: 'BÀI 15. BIỂU THỨC',
    themeTitle: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Hiểu khái niệm biểu thức theo SGK Tin học 5: sự kết hợp của các giá trị, biến, phép toán (+, -, *, /) và so sánh (>, <, =) để tính ra một kết quả.',
      do: 'Sử dụng được các khối lệnh biểu thức số học và biểu thức so sánh trong nhóm Các phép toán để tính toán và làm điều kiện cho chương trình.',
      thinking: 'Phát triển tư duy tính toán và so sánh số học trong việc điều khiển luồng chương trình.'
    },
    keyKnowledge: {
      summary: 'Biểu thức là công cụ giúp máy tính thực hiện các phép tính số học và so sánh logic, từ đó đưa ra kết quả chính xác cho các bài toán.',
      points: [
        { title: 'Biểu thức số học', desc: 'Gồm các số hoặc biến được nối với nhau bằng các dấu phép tính cộng (+), trừ (-), nhân (*), chia (/). Cho kết quả là một con số.', icon: '➕' },
        { title: 'Biểu thức so sánh', desc: 'Dùng các dấu so sánh lớn hơn (>), nhỏ hơn (<), bằng (=). Cho kết quả là Đúng hoặc Sai, thường được dùng làm điều kiện trong cấu trúc rẽ nhánh.', icon: '⚖️' },
        { title: 'Nhóm Các phép toán trong Scratch', desc: 'Mang màu xanh lá cây rực rỡ (#59C059). Khối hình tròn trả về số/chữ, khối hình lục giác trả về Đúng/Sai.', icon: '🟢' }
      ]
    },
    keywords: [
      { term: 'Biểu thức', meaning: 'Sự kết hợp giữa số, biến và phép toán để tính ra một giá trị kết quả.' },
      { term: 'Biểu thức số học', meaning: 'Biểu thức thực hiện các phép tính cộng, trừ, nhân, chia trả về giá trị số.' },
      { term: 'Biểu thức so sánh', meaning: 'Biểu thức so sánh hai giá trị (lớn hơn, nhỏ hơn, bằng nhau) trả về kết quả Đúng hoặc Sai.' },
      { term: 'Các phép toán', meaning: 'Nhóm lệnh màu xanh lá cây chứa các khối biểu thức tính toán và so sánh trong Scratch.' }
    ],
    observation: {
      title: 'Quan sát Mèo tính tổng hai số',
      description: 'Chú Mèo tính tổng 15 + 25 bằng khối biểu thức [15 + 25] và nói to kết quả 40 trên sân khấu.',
      sampleBlocks: [
        { id: 'g5-15-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g5-15-b2', category: 'looks', text: 'nói (15 + 25) trong 2 giây', shape: 'stack', explanation: 'Máy tính tính kết quả của biểu thức rồi hiển thị số 40' }
      ],
      highlight: 'Biểu thức giúp biến Scratch thành một chiếc máy tính siêu thông minh!'
    },
    exploration: {
      title: 'Tìm hiểu cách lồng ghép biến vào trong biểu thức',
      question: 'Nếu ta có biến [Điểm], ta có thể đặt khối tròn [Điểm] vào trong biểu thức [(Điểm) + 10] được không?',
      interactivePoints: [
        'Hoàn toàn được! Scratch cho phép thả khối biến hình tròn vào bất kỳ ô tròn nào của biểu thức.',
        'Khi đó, máy tính sẽ lấy giá trị hiện tại của biến Điểm cộng thêm 10.',
        'Ta cũng có thể dùng biểu thức so sánh <(Điểm) > 50> để kiểm tra xem người chơi đã chiến thắng hay chưa.'
      ]
    },
    practice: {
      title: 'Thực hành: Tính điểm nhân đôi và kiểm tra chiến thắng',
      goal: 'Tạo chương trình: Đặt biến Điểm thành 10. Mèo nói "Điểm nhân đôi là:" cùng kết quả biểu thức (Điểm * 2) trong 2 giây.',
      steps: [
        'Bước 1: Kéo khối lệnh [khi bấm vào cờ xanh].',
        'Bước 2: Gắn khối [đặt [Điểm] thành 10].',
        'Bước 3: Chọn nhóm Các phép toán (màu xanh lá), lấy khối phép nhân tròn [ ( ) * ( ) ].',
        'Bước 4: Thả biến [Điểm] vào ô thứ nhất, gõ số 2 vào ô thứ hai.',
        'Bước 5: Thả toàn bộ khối phép nhân vào trong khối [nói ( ) trong 2 giây] và chạy thử.'
      ],
      initialBlocks: [
        { id: 'p5-15-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p5-15-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p5-15-2', category: 'variables', text: 'đặt [Điểm] thành 10', shape: 'stack' },
        { id: 'p5-15-3', category: 'looks', text: 'nói (Điểm * 2) trong 2 giây', shape: 'stack' }
      ],
      hint: 'Hãy chú ý thả khối tròn [Điểm] vào đúng ô tròn màu trắng bên trong khối phép nhân màu xanh lá.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Khi bấm Cờ xanh, Chú Mèo hiển thị đúng con số 20 (kết quả của 10 nhân 2).',
      partialCriteria: 'Sai phép tính: Chọn nhầm khối phép cộng thay vì phép nhân khiến kết quả ra 12 thay vì 20.',
      reviewAdvice: 'Hãy chọn đúng khối có dấu sao (*) tượng trưng cho phép nhân trong toán học máy tính.'
    },
    summary: {
      takeaways: [
        'Biểu thức là sự kết hợp của số, biến và phép toán để tính ra giá trị kết quả.',
        'Có hai loại biểu thức thường dùng: biểu thức số học (tính toán số) và biểu thức so sánh (kiểm tra điều kiện Đúng/Sai).',
        'Biểu thức nằm trong nhóm Các phép toán màu xanh lá cây và có thể lồng vào các khối lệnh khác.'
      ]
    },
    teacherNotes: 'Sử dụng đúng thuật ngữ "biểu thức", "biểu thức số học", "biểu thức so sánh" theo SGK Tin học 5. Hướng dẫn học sinh cách lồng ghép khối biểu thức vào các vị trí thích hợp.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Trong nhóm Các phép toán còn có khối [kết hợp "táo" và "chuối"] để ghép hai đoạn chữ lại với nhau thành một câu hoàn chỉnh.',
    xpReward: 45,
    nextLessonId: 'grade5_lesson16'
  },

  // -------------------------------------------------------------------------
  // BÀI 16. TỪ KỊCH BẢN ĐẾN CHƯƠNG TRÌNH
  // -------------------------------------------------------------------------
  {
    id: 'grade5_lesson16',
    grade: 5,
    lessonNumber: 16,
    title: 'BÀI 16. TỪ KỊCH BẢN ĐẾN CHƯƠNG TRÌNH',
    themeTitle: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    objectives: {
      know: 'Nắm vững quy trình tổng hợp 8 bước từ kịch bản đến chương trình hoàn chỉnh theo đúng chuẩn SGK Tin học 5.',
      do: 'Thực hiện thuần thục chu trình: Kịch bản ➔ Phân tích yêu cầu ➔ Xác định các bước ➔ Lựa chọn cấu trúc (tuần tự, lặp, rẽ nhánh) ➔ Tạo chương trình ➔ Chạy thử ➔ Kiểm tra ➔ Điều chỉnh.',
      thinking: 'Hoàn thiện tư duy thuật toán và kỹ năng giải quyết vấn đề với sự trợ giúp của máy tính ở cấp tiểu học.'
    },
    keyKnowledge: {
      summary: 'Bài 16 là bài tổng kết quan trọng nhất của Lớp 5, kết nối toàn bộ kiến thức về cấu trúc tuần tự, cấu trúc lặp, cấu trúc rẽ nhánh, biến và biểu thức thành một phương pháp lập trình chuyên nghiệp.',
      points: [
        { title: '1. Kịch bản', desc: 'Mô tả câu chuyện hoặc trò chơi bằng ngôn ngữ đời thường gần gũi.', icon: '📝' },
        { title: '2. Phân tích yêu cầu & Xác định các bước', desc: 'Chỉ rõ nhân vật, phông nền, các đại lượng cần lưu trữ (biến) và từng hành động cần làm.', icon: '🔎' },
        { title: '3. Lựa chọn cấu trúc lập trình', desc: 'Bước nào làm lần lượt dùng Cấu trúc tuần tự; bước nào làm nhiều lần dùng Cấu trúc lặp; bước nào cần kiểm tra tình huống dùng Cấu trúc rẽ nhánh.', icon: '🏗️' },
        { title: '4. Tạo chương trình & Chạy thử', desc: 'Ghép nối các khối lệnh theo thiết kế và bấm Cờ xanh chạy thử nghiệm.', icon: '💻' },
        { title: '5. Kiểm tra & Điều chỉnh', desc: 'Đối chiếu kết quả thực tế với kịch bản ban đầu và tinh chỉnh các lỗi nếu có.', icon: '✨' }
      ]
    },
    keywords: [
      { term: 'Kịch bản', meaning: 'Bản mô tả chi tiết diễn biến câu chuyện, hoạt ảnh hoặc trò chơi trước khi lập trình.' },
      { term: 'Phân tích yêu cầu', meaning: 'Xác định các mục tiêu, đối tượng, biến số và điều kiện cần có trong chương trình.' },
      { term: 'Lựa chọn cấu trúc', meaning: 'Quyết định sử dụng cấu trúc tuần tự, cấu trúc lặp hay cấu trúc rẽ nhánh cho từng phần việc.' },
      { term: 'Kiểm tra và điều chỉnh', meaning: 'So sánh kết quả chạy thực tế với yêu cầu của kịch bản và sửa chữa sai sót.' }
    ],
    observation: {
      title: 'Quan sát kịch bản trò chơi: Chú Mèo hứng táo ghi điểm',
      description: 'Kịch bản: Chú Mèo di chuyển qua lại. Quả táo rơi từ trên xuống. Nếu Mèo hứng được táo thì tăng 1 điểm và phát ra âm thanh vui nhộn.',
      sampleBlocks: [
        { id: 'g5-16-b1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'g5-16-b2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack' },
        { id: 'g5-16-b3', category: 'control', text: 'lặp lại 10 lần', shape: 'c-block' },
        { id: 'g5-16-b4', category: 'motion', text: 'di chuyển 10 bước', shape: 'stack' },
        { id: 'g5-16-b5', category: 'control', text: 'nếu <đang chạm [Quả táo]?> thì', shape: 'c-block' },
        { id: 'g5-16-b6', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack' }
      ],
      highlight: 'Sự kết hợp hài hòa giữa Tuần tự, Lặp, Rẽ nhánh và Biến số tạo nên một sản phẩm hoàn chỉnh!'
    },
    exploration: {
      title: 'Tìm hiểu chu trình phát triển sản phẩm lập trình',
      question: 'Khi chương trình chạy thử chưa giống với kịch bản, ta nên làm gì đầu tiên?',
      interactivePoints: [
        'Bình tĩnh đọc lại kịch bản để xem mình đã hiểu sai hoặc bỏ sót bước nào.',
        'Kiểm tra từng khối lệnh xem cấu trúc lựa chọn (tuần tự, lặp, rẽ nhánh) đã đúng chưa.',
        'Sửa từng lỗi một và bấm Cờ xanh kiểm tra lại ngay sau mỗi lần sửa.'
      ]
    },
    practice: {
      title: 'Thực hành: Từ kịch bản đến chương trình thi chạy',
      goal: 'Thực hiện đầy đủ quy trình: Kịch bản cho Mèo thi chạy 5 nhịp, mỗi nhịp đi 20 bước, nếu hoàn thành thì nói "Chiến thắng!" và kết thúc.',
      steps: [
        'Bước 1: Phân tích kịch bản: Cần vòng lặp 5 lần cho hành động chạy nhịp nhàng.',
        'Bước 2: Kéo khối [khi bấm vào cờ xanh].',
        'Bước 3: Lồng khối [lặp lại 5 lần], bên trong đặt [di chuyển 20 bước] và [đợi 0.2 giây].',
        'Bước 4: Sau khi kết thúc vòng lặp, gắn khối tuần tự [nói "Chiến thắng!" trong 2 giây].',
        'Bước 5: Chạy thử và đối chiếu xem chương trình đã tuân thủ đúng kịch bản chưa.'
      ],
      initialBlocks: [
        { id: 'p5-16-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' }
      ],
      targetBlocks: [
        { id: 'p5-16-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
        { id: 'p5-16-2', category: 'control', text: 'lặp lại 5 lần', shape: 'c-block' },
        { id: 'p5-16-3', category: 'motion', text: 'di chuyển 20 bước', shape: 'stack' },
        { id: 'p5-16-4', category: 'control', text: 'đợi 0.2 giây', shape: 'stack' },
        { id: 'p5-16-5', category: 'looks', text: 'nói "Chiến thắng!" trong 2 giây', shape: 'stack' }
      ],
      hint: 'Khối nói "Chiến thắng!" phải được gắn ở phía dưới vòng lặp, chứ không phải nằm bên trong vòng lặp nhé.'
    },
    checkResult: {
      correctCriteria: 'Đúng chuẩn: Chú Mèo chạy hết 5 nhịp rồi mới nói câu "Chiến thắng!" đúng 1 lần duy nhất.',
      partialCriteria: 'Sai cấu trúc: Khối nói bị đặt vào bên trong vòng lặp khiến Mèo nói "Chiến thắng!" sau mỗi bước chạy.',
      reviewAdvice: 'Hãy kéo khối nói ra ngoài và gắn vào đáy của khối [lặp lại 5 lần].'
    },
    summary: {
      takeaways: [
        'Quy trình từ kịch bản đến chương trình gồm: Kịch bản ➔ Phân tích yêu cầu ➔ Xác định các bước ➔ Lựa chọn cấu trúc ➔ Tạo chương trình ➔ Chạy thử ➔ Kiểm tra ➔ Điều chỉnh.',
        'Biết kết hợp linh hoạt cấu trúc tuần tự, cấu trúc lặp, cấu trúc rẽ nhánh và biến giúp em giải quyết mọi bài toán lập trình.',
        'Chúc mừng em đã hoàn thành xuất sắc chương trình Tin học Tiểu học với Scratch!'
      ]
    },
    teacherNotes: 'Đánh giá năng lực tổng hợp của học sinh lớp 5 theo các yêu cầu cần đạt của Chủ đề 6 SGK Tin học 5 Kết nối tri thức. Khuyến khích học sinh trình bày và giải thích kịch bản của mình trước lớp.',
    expansionHint: 'Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học: Em có thể thêm nhân vật thứ hai để tạo thành một cuộc thi chạy tiếp sức thú vị giữa hai bạn nhỏ trên sân khấu.',
    xpReward: 50,
    nextLessonId: undefined
  }
];
