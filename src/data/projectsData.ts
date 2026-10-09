import { ScratchProject } from '../types';

export const PROJECTS_DATA: ScratchProject[] = [
  {
    id: 'proj-1-biet-noi',
    projectNumber: 1,
    title: 'Dự án 1: Nhân vật biết nói & Tự giới thiệu',
    grade: 4,
    difficulty: 'Cơ bản',
    thumbnailIcon: 'MessageSquare',
    idea: 'Tạo một đoạn phim hoạt hình ngắn giới thiệu bản thân, ước mơ và sở thích của chú mèo Scratch.',
    objective: 'Sử dụng thành thạo khối Sự kiện [khi bấm cờ xanh] và các khối Hiển thị [nói ... trong ... giây].',
    knowledgeUsed: ['Sự kiện Cờ Xanh', 'Khối Nói có thời gian', 'Âm thanh Meow', 'Đổi trang phục'],
    characters: ['Chú Mèo Scratch'],
    backgrounds: ['Phòng học vui vẻ (School)'],
    steps: [
      'Bước 1: Chọn phông nền trường học và nhân vật chú Mèo.',
      'Bước 2: Gắn khối Sự kiện [khi bấm vào cờ xanh] lên đầu kịch bản.',
      'Bước 3: Gắn khối [nói "Xin chào các bạn!" trong 2 giây].',
      'Bước 4: Gắn tiếp khối [nói "Mình là chú mèo Scratch mê lập trình!" trong 3 giây].',
      'Bước 5: Thêm âm thanh [phát âm thanh "Meow"] reo vui.'
    ],
    starterBlocks: [
      { id: 'p1-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p1-2', category: 'looks', text: 'nói "Xin chào các bạn!" trong 2 giây', shape: 'stack' },
      { id: 'p1-3', category: 'sound', text: 'phát âm thanh "Meow"', shape: 'stack' }
    ],
    hint: 'Dùng khối [nói ... trong ... giây] để các câu thoại hiện lần lượt không bị đè lên nhau.',
    extendedChallenge: 'Đổi câu thoại thành tên thật của em và ước mơ nghề nghiệp tương lai nhé!',
    rubric: [
      { criteria: 'Khởi động đúng bằng cờ xanh', points: 30 },
      { criteria: 'Có ít nhất 2 câu thoại nói rõ ràng', points: 40 },
      { criteria: 'Có âm thanh hoặc biểu cảm nhân vật', points: 30 }
    ]
  },
  {
    id: 'proj-2-thiep-sinh-nhat',
    projectNumber: 2,
    title: 'Dự án 2: Thiệp sinh nhật rực rỡ sắc màu',
    grade: 4,
    difficulty: 'Cơ bản',
    thumbnailIcon: 'Gift',
    idea: 'Tạo một tấm thiệp điện tử tặng bạn thân, khi bấm chuột vào chiếc bánh kem thì nến sáng lên và đổi màu lung linh!',
    objective: 'Làm quen sự kiện click [khi bấm vào nhân vật này] và hiệu ứng đồ họa [thay đổi hiệu ứng màu].',
    knowledgeUsed: ['Sự kiện bấm vào nhân vật', 'Hiệu ứng đổi màu', 'Thay đổi kích thước', 'Âm thanh chúc mừng'],
    characters: ['Bánh kem (Cake)', 'Bóng bay (Balloon)'],
    backgrounds: ['Phòng tiệc sinh nhật (Party)'],
    steps: [
      'Bước 1: Chọn phông nền bữa tiệc (Party) và nhân vật Bánh sinh nhật.',
      'Bước 2: Viết lệnh cho Bánh: [khi bấm vào nhân vật này].',
      'Bước 3: Thêm hiệu ứng: [thay đổi hiệu ứng [màu] một lượng 25] và [thay đổi kích thước 10].',
      'Bước 4: Nói lời chúc: [nói "Chúc mừng sinh nhật bạn yêu quý!" trong 3 giây].',
      'Bước 5: Phát bài nhạc sinh nhật vui nhộn.'
    ],
    starterBlocks: [
      { id: 'p2-1', category: 'events', text: 'khi bấm vào nhân vật này', shape: 'hat' },
      { id: 'p2-2', category: 'looks', text: 'thay đổi hiệu ứng [màu] một lượng 25', shape: 'stack' },
      { id: 'p2-3', category: 'looks', text: 'nói "Happy Birthday!" trong 2 giây', shape: 'stack' }
    ],
    hint: 'Nhóm Hiển thị màu tím có khối thay đổi hiệu ứng màu sắc rất lung linh.',
    extendedChallenge: 'Vẽ thêm tên của người bạn em muốn tặng lên tấm thiệp nhé!',
    rubric: [
      { criteria: 'Có tương tác khi bấm vào bánh kem', points: 40 },
      { criteria: 'Có hiệu ứng màu sắc sinh động', points: 30 },
      { criteria: 'Lời chúc ý nghĩa', points: 30 }
    ]
  },
  {
    id: 'proj-3-di-chuyen',
    projectNumber: 3,
    title: 'Dự án 3: Chú Mèo đi dạo trên bãi biển',
    grade: 4,
    difficulty: 'Cơ bản',
    thumbnailIcon: 'Footprints',
    idea: 'Lập trình cho chú mèo tự bước đi qua lại nhịp nhàng trên bãi biển nắng vàng và không bao giờ bị rơi ra khỏi màn hình.',
    objective: 'Kết hợp Chuyển động [di chuyển], [bật lại nếu chạm cạnh] và đổi trang phục bước chân.',
    knowledgeUsed: ['Vòng lặp liên tục', 'Bật lại nếu chạm cạnh', 'Kiểu xoay trái - phải', 'Đổi trang phục kế tiếp'],
    characters: ['Chú Mèo Scratch'],
    backgrounds: ['Bãi biển nhiệt đới (Beach Malibu)'],
    steps: [
      'Bước 1: Chọn phông nền Bãi biển (Beach) và đặt kiểu xoay [trái - phải].',
      'Bước 2: Gắn vòng lặp [liên tục] sau Cờ Xanh.',
      'Bước 3: Bên trong lặp: [di chuyển 10 bước], [chuyển sang trang phục kế tiếp], [bật lại nếu chạm cạnh].',
      'Bước 4: Thêm [đợi 0.1 giây] để mèo bước khoan thai tự nhiên.'
    ],
    starterBlocks: [
      { id: 'p3-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p3-2', category: 'motion', text: 'đặt kiểu xoay [trái - phải]', shape: 'stack' },
      { id: 'p3-3', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'p3-4', category: 'motion', text: 'di chuyển 10 bước', shape: 'stack' },
      { id: 'p3-5', category: 'motion', text: 'bật lại nếu chạm cạnh', shape: 'stack' }
    ],
    hint: 'Nhớ dùng khối [đặt kiểu xoay [trái - phải]] để mèo không bị lộn ngược đầu nhé.',
    extendedChallenge: 'Thay đổi số bước từ 10 thành 15 hoặc 5 để xem mèo chạy nhanh hay chậm!',
    rubric: [
      { criteria: 'Nhân vật di chuyển liên tục mượt mà', points: 35 },
      { criteria: 'Biết tự quay đầu khi gặp mép màn hình', points: 35 },
      { criteria: 'Trang phục đổi đều đặn như đang bước đi', points: 30 }
    ]
  },
  {
    id: 'proj-4-tuong-tac',
    projectNumber: 4,
    title: 'Dự án 4: Câu chuyện tương tác hai người bạn',
    grade: 4,
    difficulty: 'Trung bình',
    thumbnailIcon: 'Users',
    idea: 'Kể lại câu chuyện Chú Mèo gặp Bạn Gấu trong rừng sâu, cả hai hỏi thăm nhau và rủ nhau đi hái nấm.',
    objective: 'Thực hành tính toán thời gian chờ đợi [đợi ... giây] để hai nhân vật đối đáp nhịp nhàng.',
    knowledgeUsed: ['Nhiều nhân vật', 'Độ trễ thời gian [đợi ... giây]', 'Lời thoại theo kịch bản', 'Đổi phông nền'],
    characters: ['Chú Mèo (Cat)', 'Bạn Gấu (Bear)'],
    backgrounds: ['Rừng cây cổ tích (Forest)'],
    steps: [
      'Bước 1: Thêm 2 nhân vật Mèo và Gấu đứng đối diện nhau.',
      'Bước 2: Mèo nói câu 1 trong 2 giây -> Gấu đợi 2 giây.',
      'Bước 3: Gấu nói đáp lại trong 2 giây -> Mèo đợi 2 giây.',
      'Bước 4: Cả hai cùng nói "Chúng mình cùng đi chơi nhé!" và cùng bước đi.'
    ],
    starterBlocks: [
      { id: 'p4-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p4-2', category: 'looks', text: 'nói "Chào Gấu, bạn đang đi đâu thế?" trong 2 giây', shape: 'stack' },
      { id: 'p4-3', category: 'control', text: 'đợi 2 giây', shape: 'stack' },
      { id: 'p4-4', category: 'looks', text: 'nói "Đi thôi nào!" trong 2 giây', shape: 'stack' }
    ],
    hint: 'Khi nhân vật này nói thì nhân vật kia phải dùng khối [đợi ... giây] tương ứng.',
    extendedChallenge: 'Đổi cảnh sang một khu rừng nấm sau khi hai bạn rủ nhau đi!',
    rubric: [
      { criteria: 'Hai nhân vật không nói đè lên nhau', points: 40 },
      { criteria: 'Kịch bản câu chuyện dễ thương, có ý nghĩa', points: 30 },
      { criteria: 'Có cử chỉ di chuyển hoặc đổi dáng', points: 30 }
    ]
  },
  {
    id: 'proj-5-me-cung',
    projectNumber: 5,
    title: 'Dự án 5: Mê cung thám hiểm kỳ bí',
    grade: 4,
    difficulty: 'Trung bình',
    thumbnailIcon: 'Compass',
    idea: 'Dẫn đường cho chú mèo tìm đường thoát khỏi mê cung chằng chịt, nếu lỡ chạm vào bức tường sẽ bị bật trở lại điểm xuất phát!',
    objective: 'Ứng dụng cảm biến màu sắc [đang chạm màu ...?] và điều khiển 4 hướng mũi tên.',
    knowledgeUsed: ['Cảm biến màu sắc', 'Tọa độ xuất phát', 'Điều khiển 4 hướng', 'Khối điều kiện Nếu-Thì'],
    characters: ['Chú Mèo Scratch', 'Chìa khóa vàng (Key)'],
    backgrounds: ['Phông nền Mê cung tự vẽ (Vách tường màu đen)'],
    steps: [
      'Bước 1: Vẽ phông nền mê cung có các vách tường đồng nhất màu đen.',
      'Bước 2: Đặt Mèo tại cổng vào tọa độ x: -200, y: 140.',
      'Bước 3: Lập trình di chuyển 4 phím mũi tên: Lên, Xuống, Trái, Phải.',
      'Bước 4: Trong [liên tục]: [nếu <đang chạm màu [#000000]?> thì [đi tới x: -200 y: 140]].',
      'Bước 5: Khi chạm Chìa khóa vàng: hiện chữ Chiến Thắng!'
    ],
    starterBlocks: [
      { id: 'p5-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p5-2', category: 'motion', text: 'đi tới điểm x: -200 y: 140', shape: 'stack' },
      { id: 'p5-3', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'p5-4', category: 'control', text: 'nếu <đang chạm màu [#000000]?> thì', shape: 'c-block' },
      { id: 'p5-5', category: 'motion', text: 'đi tới điểm x: -200 y: 140', shape: 'stack' }
    ],
    hint: 'Nhớ dùng công cụ hút màu để chọn chính xác mã màu của vách tường nhé.',
    extendedChallenge: 'Thêm một con quái vật nhỏ đi tuần tra trong mê cung!',
    rubric: [
      { criteria: 'Điều khiển di chuyển 4 hướng mượt mà', points: 30 },
      { criteria: 'Xử lý va chạm vách tường chuẩn xác', points: 40 },
      { criteria: 'Có đích đến và thông báo chiến thắng', points: 30 }
    ]
  },
  {
    id: 'proj-6-bat-do-vat',
    projectNumber: 6,
    title: 'Dự án 6: Trò chơi hứng táo rơi tính điểm',
    grade: 5,
    difficulty: 'Trung bình',
    thumbnailIcon: 'Apple',
    idea: 'Những quả táo chín mọng từ ngọn cây rơi xuống, em dùng chiếc bát di chuyển ngang để hứng táo và ghi điểm!',
    objective: 'Kết hợp điều khiển phím mũi tên, tọa độ y rơi tự do, cảm biến va chạm và biến số điểm.',
    knowledgeUsed: ['Biến số Điểm', 'Tọa độ X-Y rơi tự do', 'Lấy số ngẫu nhiên', 'Cảm biến va chạm'],
    characters: ['Chiếc bát hứng (Bowl)', 'Quả táo (Apple)'],
    backgrounds: ['Vườn cây táo (Tree)'],
    steps: [
      'Bước 1: Tạo biến [Điểm], đặt thành 0 lúc bắt đầu.',
      'Bước 2: Chiếc bát di chuyển ngang theo chuột: [đặt x thành (tọa độ x của chuột)].',
      'Bước 3: Quả táo xuất hiện ở đỉnh y: 160, x ngẫu nhiên từ -200 đến 200.',
      'Bước 4: Quả táo rơi: [thay đổi y một lượng -7].',
      'Bước 5: NẾU chạm Bát: cộng 1 điểm, kêu tiếng Pop và nhảy lại lên đỉnh.'
    ],
    starterBlocks: [
      { id: 'p6-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p6-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack' },
      { id: 'p6-3', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'p6-4', category: 'motion', text: 'thay đổi y một lượng -7', shape: 'stack' },
      { id: 'p6-5', category: 'control', text: 'nếu <đang chạm [Chiếc bát]?> thì', shape: 'c-block' },
      { id: 'p6-6', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack' }
    ],
    hint: 'Sau khi cộng điểm, nhớ đưa quả táo về lại đỉnh màn hình ngay lập tức để không bị cộng điểm liên tục.',
    extendedChallenge: 'Khi đạt 10 điểm thì nhân vật hô vang "Chiến thắng rồi!" và dừng lại.',
    rubric: [
      { criteria: 'Điều khiển đĩa hứng mượt mà', points: 30 },
      { criteria: 'Táo rơi tự nhiên và xuất hiện ngẫu nhiên', points: 30 },
      { criteria: 'Cộng điểm chuẩn xác khi hứng trúng', points: 40 }
    ]
  },
  {
    id: 'proj-7-tinh-diem',
    projectNumber: 7,
    title: 'Dự án 7: Trò chơi Đập bóng tính điểm & Mạng chơi',
    grade: 5,
    difficulty: 'Nâng cao',
    thumbnailIcon: 'Activity',
    idea: 'Những quả bóng bay từ dưới bay lên với tốc độ khác nhau. Bấm chuột đập bóng để ghi điểm, nhưng cẩn thận bóng gai đen sẽ trừ mạng!',
    objective: 'Quản trị đồng thời 2 biến số [Điểm] và [Mạng], phân loại điều kiện tính điểm và trừ mạng.',
    knowledgeUsed: ['Hai biến số Điểm và Mạng', 'Điều kiện so sánh kết thúc', 'Hiệu ứng âm thanh', 'Tốc độ ngẫu nhiên'],
    characters: ['Bóng bay đỏ (Thưởng điểm)', 'Bóng gai đen (Trừ mạng)'],
    backgrounds: ['Bầu trời xanh (Blue Sky)'],
    steps: [
      'Bước 1: Khởi tạo: Điểm = 0, Mạng = 3.',
      'Bước 2: Bóng đỏ bay lên: Bấm vào thì cộng 1 điểm.',
      'Bước 3: Bóng gai bay lên: Bấm vào thì trừ 1 mạng.',
      'Bước 4: Kiểm tra liên tục: NẾU Mạng < 1 thì Game Over!'
    ],
    starterBlocks: [
      { id: 'p7-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p7-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack' },
      { id: 'p7-3', category: 'variables', text: 'đặt [Mạng] thành 3', shape: 'stack' },
      { id: 'p7-4', category: 'control', text: 'nếu <(Mạng) < (1)> thì', shape: 'c-block' },
      { id: 'p7-5', category: 'control', text: 'dừng lại [tất cả]', shape: 'cap' }
    ],
    hint: 'Dùng khối [khi bấm vào nhân vật này] cho từng quả bóng để xử lý điểm số riêng biệt.',
    extendedChallenge: 'Tạo màn hình thông báo Game Over khi hết mạng chơi!',
    rubric: [
      { criteria: 'Hệ thống Điểm và Mạng hoạt động chuẩn', points: 40 },
      { criteria: 'Phân loại bóng thưởng và bóng phạt chính xác', points: 35 },
      { criteria: 'Giao diện và âm thanh hồi hộp', points: 25 }
    ]
  },
  {
    id: 'proj-8-hoi-dap',
    projectNumber: 8,
    title: 'Dự án 8: Trò chơi Ai thông minh hơn học sinh Lớp 5?',
    grade: 5,
    difficulty: 'Trung bình',
    thumbnailIcon: 'HelpCircle',
    idea: 'Xây dựng một chương trình gameshow đố vui kiến thức Khoa học, Lịch sử, Địa lý tiểu học có tính điểm và xếp hạng.',
    objective: 'Thực hành khối [hỏi ... và đợi], [câu trả lời], so sánh chuỗi và ghép nối kết quả.',
    knowledgeUsed: ['Cảm biến Hỏi & Đợi', 'Biến câu trả lời', 'Cấu trúc rẽ nhánh Nếu-Thì', 'Biến tổng điểm'],
    characters: ['Người dẫn chương trình MC (Scratch Cat)'],
    backgrounds: ['Trường quay Gameshow (Stage Spotlight)'],
    steps: [
      'Bước 1: MC chào mừng và đặt Điểm = 0.',
      'Bước 2: Câu hỏi 1: "Mặt trời mọc ở hướng nào?". Nếu đúng là "Đông" thì cộng 1 điểm.',
      'Bước 3: Câu hỏi 2: "9 nhân 9 bằng bao nhiêu?". Nếu đúng là "81" thì cộng 1 điểm.',
      'Bước 4: Tổng kết và xếp loại: Nếu Điểm = 2 thì là "Thiên tài nhí"!'
    ],
    starterBlocks: [
      { id: 'p8-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p8-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack' },
      { id: 'p8-3', category: 'sensing', text: 'hỏi [Mặt trời mọc ở hướng nào?] và đợi', shape: 'stack' },
      { id: 'p8-4', category: 'control', text: 'nếu <(câu trả lời) = [Đông]> thì', shape: 'c-block' },
      { id: 'p8-5', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack' }
    ],
    hint: 'Nhớ dùng khối Nếu-Thì-Nếu không thì để nếu người chơi trả lời sai thì thông báo đáp án đúng.',
    extendedChallenge: 'Bổ sung thêm âm thanh vỗ tay khi trả lời đúng!',
    rubric: [
      { criteria: 'Các câu hỏi thú vị, bổ ích', points: 35 },
      { criteria: 'Xử lý câu trả lời chính xác', points: 35 },
      { criteria: 'Có tổng kết điểm và xếp hạng cuối game', points: 30 }
    ]
  },
  {
    id: 'proj-9-bao-ve-dao',
    projectNumber: 9,
    title: 'Dự án 9: Cuộc chiến bảo vệ hòn đảo ngọc',
    grade: 5,
    difficulty: 'Nâng cao',
    thumbnailIcon: 'ShieldAlert',
    idea: 'Thuyền hải tặc liên tục áp sát hòn đảo ngọc. Em điều khiển tháp pháo ngắm bắn bong bóng nước sử dụng kỹ thuật Bản sao (Clones)!',
    objective: 'Làm chủ kỹ thuật Bản sao (Clones), điều khiển nhiều đối tượng và quản lý va chạm liên hoàn.',
    knowledgeUsed: ['Bản sao Clones', 'Hướng về con trỏ chuột', 'Nhiều nhân vật', 'Biến Điểm số và Mạng'],
    characters: ['Tháp pháo (Cannon)', 'Đạn bong bóng nước (Bubble)', 'Thuyền hải tặc (Ship)'],
    backgrounds: ['Đảo ngọc biển sâu (Island)'],
    steps: [
      'Bước 1: Khởi tạo Điểm = 0, Mạng = 3.',
      'Bước 2: Tháp pháo luôn: [hướng về phía con trỏ chuột].',
      'Bước 3: Khi bấm chuột: [tạo bản sao của Đạn]. Bản sao đạn bay thẳng theo hướng pháo.',
      'Bước 4: Thuyền địch liên tục tạo bản sao bơi về tâm đảo.',
      'Bước 5: Đạn chạm thuyền: xóa cả 2 bản sao và cộng 1 điểm.'
    ],
    starterBlocks: [
      { id: 'p9-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p9-2', category: 'control', text: 'tạo bản sao của [bản thân tôi]', shape: 'stack' },
      { id: 'p9-3', category: 'control', text: 'khi tôi bắt đầu là một bản sao', shape: 'hat' },
      { id: 'p9-4', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack' },
      { id: 'p9-5', category: 'control', text: 'xóa bản sao này', shape: 'cap' }
    ],
    hint: 'Nhớ xóa bản sao đạn khi chạm cạnh sân khấu để không bị đầy bộ nhớ.',
    extendedChallenge: 'Thêm thuyền trùm khổng lồ Boss xuất hiện ở phút thứ 2!',
    rubric: [
      { criteria: 'Sử dụng thành thạo cơ chế Bản sao (Clones)', points: 40 },
      { criteria: 'Hệ thống bắn đạn và va chạm mượt mà', points: 35 },
      { criteria: 'Đồ họa và âm thanh kịch tính', points: 25 }
    ]
  },
  {
    id: 'proj-10-tu-chon',
    projectNumber: 10,
    title: 'Dự án 10: Xưởng sáng tạo – Dự án tự chọn',
    grade: 'both',
    difficulty: 'Nâng cao',
    thumbnailIcon: 'Sparkles',
    idea: 'Tự do hiện thực hóa bất kỳ ý tưởng nào trong tâm trí em: Game bóng bàn, Trò chơi nuôi thú ảo, Phim hoạt hình phiêu lưu vũ trụ...',
    objective: 'Vận dụng toàn diện kiến thức Scratch để độc lập lên kế hoạch, lập trình và sửa lỗi dự án.',
    knowledgeUsed: ['Toàn bộ các nhóm lệnh Scratch đã học', 'Tư duy thuật toán sáng tạo', 'Kỹ năng Debugging'],
    characters: ['Tự chọn hoặc tự vẽ bằng Paint'],
    backgrounds: ['Tự chọn từ thư viện hoặc tự vẽ'],
    steps: [
      'Bước 1: Sử dụng tính năng "Ý tưởng dự án của em" để AI hỗ trợ lập kế hoạch.',
      'Bước 2: Chuẩn bị nhân vật và phông nền theo kế hoạch.',
      'Bước 3: Lập trình từng nhân vật một từ dễ đến khó.',
      'Bước 4: Chạy thử, phát hiện lỗi và sửa chữa.',
      'Bước 5: Hoàn thiện âm thanh và hiệu ứng chúc mừng.'
    ],
    starterBlocks: [
      { id: 'p10-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'p10-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack' },
      { id: 'p10-3', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'p10-4', category: 'looks', text: 'thay đổi hiệu ứng [màu] một lượng 25', shape: 'stack' }
    ],
    hint: 'Hãy bắt đầu từ phiên bản đơn giản nhất trước, sau đó mới bổ sung thêm tính năng nâng cao!',
    extendedChallenge: 'Chia sẻ dự án cho thầy cô và các bạn trong lớp cùng chơi thử!',
    rubric: [
      { criteria: 'Ý tưởng sáng tạo, độc đáo', points: 30 },
      { criteria: 'Mã nguồn khoa học, tối ưu bằng vòng lặp', points: 40 },
      { criteria: 'Trải nghiệm người chơi hấp dẫn, không lỗi', points: 30 }
    ]
  }
];
