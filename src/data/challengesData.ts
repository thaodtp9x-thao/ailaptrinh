import { EpicChallenge, Badge, BugScenario } from '../types';

export const EPIC_CHALLENGES: EpicChallenge[] = [
  {
    id: 'ch-1-dieu-khien',
    challengeNumber: 1,
    title: '⭐ Thử thách 1: Điều khiển nhân vật',
    grade: 4,
    badgeTitle: 'Làm quen Scratch',
    icon: 'Navigation',
    missionDesc: 'Lập trình cho chú mèo tự do di chuyển trên sân khấu bằng các phím mũi tên hoặc tự động tuần tra mà không bao giờ bị rơi ra ngoài mép màn hình.',
    requirements: [
      'Có khối lệnh Sự kiện bắt đầu bằng Cờ Xanh hoặc Phím mũi tên.',
      'Sử dụng các khối Chuyển động [di chuyển ... bước].',
      'Có khối [bật lại nếu chạm cạnh] và [đặt kiểu xoay [trái - phải]].'
    ],
    hint: 'Vào nhóm Chuyển động (màu xanh dương) tìm khối [bật lại nếu chạm cạnh] để mèo không trôi ra ngoài nhé!',
    successCondition: 'Nhân vật di chuyển mượt mà và tự bật lại khi chạm mép sân khấu.',
    xpReward: 50,
    sampleBlocks: [
      { id: 'c1-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c1-2', category: 'motion', text: 'đặt kiểu xoay [trái - phải]', shape: 'stack' },
      { id: 'c1-3', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'c1-4', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack' },
      { id: 'c1-5', category: 'motion', text: 'bật lại nếu chạm cạnh', shape: 'stack' }
    ]
  },
  {
    id: 'ch-2-ke-chuyen',
    challengeNumber: 2,
    title: '⭐ Thử thách 2: Nhân vật kể chuyện',
    grade: 4,
    badgeTitle: 'Bậc thầy khối lệnh',
    icon: 'MessageSquare',
    missionDesc: 'Sáng tác một đoạn hoạt hình ngắn 2 nhân vật gặp nhau, chào hỏi nhau bằng bong bóng lời thoại và âm thanh vui nhộn.',
    requirements: [
      'Ít nhất 2 nhân vật cùng tham gia hoạt cảnh.',
      'Có ít nhất 3 lời thoại nói có thời gian [nói ... trong ... giây].',
      'Có khối đổi phông nền phù hợp với bối cảnh câu chuyện.',
      'Có âm thanh phát ra khi kết thúc.'
    ],
    hint: 'Sử dụng khối [đợi ... giây] để nhân vật này đợi nhân vật kia nói xong rồi mới đáp lời.',
    successCondition: 'Hai nhân vật đối đáp nhịp nhàng, khớp thời gian và có âm thanh sinh động.',
    xpReward: 60,
    sampleBlocks: [
      { id: 'c2-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c2-2', category: 'looks', text: 'đổi phông nền thành [Sân trường]', shape: 'stack' },
      { id: 'c2-3', category: 'looks', text: 'nói "Chào bạn, hôm nay cùng học Scratch nhé!" trong 2 giây', shape: 'stack' },
      { id: 'c2-4', category: 'sound', text: 'phát âm thanh "Meow"', shape: 'stack' }
    ]
  },
  {
    id: 'ch-3-me-cung',
    challengeNumber: 3,
    title: '⭐ Thử thách 3: Mê cung thám hiểm',
    grade: 4,
    badgeTitle: 'Nhà tư duy thuật toán',
    icon: 'Compass',
    missionDesc: 'Dẫn đường cho chú mèo vượt qua mê cung ngoằn ngoèo để tìm chìa khóa vàng. Nếu chạm vào vách tường thì bị lùi lại xuất phát!',
    requirements: [
      'Điều khiển nhân vật 4 hướng bằng 4 phím mũi tên.',
      'Cảm biến va chạm: [nếu <đang chạm màu vách tường?> thì về điểm xuất phát].',
      'Có đích đến (Ngôi sao hoặc Chìa khóa) chúc mừng khi chiến thắng.'
    ],
    hint: 'Dùng khối [nếu <đang chạm màu [đen]?> thì] bên trong vòng lặp liên tục để kiểm tra va chạm tường.',
    successCondition: 'Nhân vật đi theo phím bấm, va tường bị phạt và chạm đích thì thắng cuộc.',
    xpReward: 70,
    sampleBlocks: [
      { id: 'c3-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c3-2', category: 'motion', text: 'đi tới điểm x: -200 y: 140', shape: 'stack' },
      { id: 'c3-3', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'c3-4', category: 'control', text: 'nếu <đang chạm màu [#000000]?> thì', shape: 'c-block' },
      { id: 'c3-5', category: 'motion', text: 'đi tới điểm x: -200 y: 140', shape: 'stack' }
    ]
  },
  {
    id: 'ch-4-bat-do-vat',
    challengeNumber: 4,
    title: '⭐ Thử thách 4: Bắt đồ vật rơi',
    grade: 5,
    badgeTitle: 'Vua vòng lặp',
    icon: 'Apple',
    missionDesc: 'Những quả táo từ trên ngọn cây rơi xuống ngẫu nhiên. Em điều khiển chiếc bát di chuyển ngang để hứng táo!',
    requirements: [
      'Quả táo xuất hiện tại tọa độ y trên đỉnh (y: 160) với x ngẫu nhiên từ -200 đến 200.',
      'Quả táo rơi xuống bằng [thay đổi y một lượng -7].',
      'Chiếc bát di chuyển ngang bằng phím mũi tên hoặc chuột.',
      'Khi hứng trúng: Phát âm thanh và đưa táo trở lại đỉnh.'
    ],
    hint: 'Sử dụng khối [lấy ngẫu nhiên từ -200 đến 200] cho tọa độ X của quả táo.',
    successCondition: 'Vật phẩm rơi tự nhiên, hứng trúng có phản hồi tức thì.',
    xpReward: 75,
    sampleBlocks: [
      { id: 'c4-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c4-2', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'c4-3', category: 'motion', text: 'thay đổi y một lượng -7', shape: 'stack' },
      { id: 'c4-4', category: 'control', text: 'nếu <đang chạm [Chiếc bát]?> thì', shape: 'c-block' },
      { id: 'c4-5', category: 'sound', text: 'phát âm thanh "Pop"', shape: 'stack' }
    ]
  },
  {
    id: 'ch-5-tinh-diem',
    challengeNumber: 5,
    title: '⭐ Thử thách 5: Trò chơi tính điểm & Mạng chơi',
    grade: 5,
    badgeTitle: 'Bậc thầy khối lệnh',
    icon: 'Trophy',
    missionDesc: 'Nâng cấp trò chơi với hệ thống Biến số: Biến Điểm số tăng khi ghi bàn, Biến Mạng chơi giảm khi bỏ lỡ.',
    requirements: [
      'Tạo 2 biến số: [Điểm] và [Mạng].',
      'Đầu game: [đặt Điểm thành 0] và [đặt Mạng thành 3].',
      'Hứng trúng: [thay đổi Điểm một lượng 1].',
      'Rơi chạm đất: [thay đổi Mạng một lượng -1].',
      'Điều kiện kết thúc khi Mạng < 1.'
    ],
    hint: 'Dùng khối [thay đổi [Điểm] một lượng 1] và khối so sánh <(Mạng) < (1)> để kết thúc game.',
    successCondition: 'Hệ thống điểm và mạng chơi hoạt động chính xác không bị cộng dồn lỗi.',
    xpReward: 80,
    sampleBlocks: [
      { id: 'c5-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c5-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack' },
      { id: 'c5-3', category: 'variables', text: 'đặt [Mạng] thành 3', shape: 'stack' },
      { id: 'c5-4', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack' }
    ]
  },
  {
    id: 'ch-6-hoi-dap',
    challengeNumber: 6,
    title: '⭐ Thử thách 6: Trò chơi Hỏi – Đáp thông minh',
    grade: 5,
    badgeTitle: 'Nhà tư duy thuật toán',
    icon: 'HelpCircle',
    missionDesc: 'Xây dựng một chương trình đố vui 3 câu hỏi. Người chơi gõ đáp án, chương trình tự chấm điểm và chúc mừng!',
    requirements: [
      'Sử dụng khối [hỏi ... và đợi] cho 3 câu hỏi.',
      'Sử dụng khối [nếu <(câu trả lời) = [...]> thì ... nếu không thì ...].',
      'Cộng điểm khi trả lời đúng, nhắc nhở khi trả lời sai.',
      'Hiện tổng điểm sau khi kết thúc 3 câu hỏi.'
    ],
    hint: 'So sánh viên ngọc [câu trả lời] với đáp án chính xác bằng toán tử = màu xanh lá.',
    successCondition: 'Hỏi đáp tương tác gõ phím mượt mà, chấm điểm chính xác.',
    xpReward: 85,
    sampleBlocks: [
      { id: 'c6-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c6-2', category: 'sensing', text: 'hỏi [Việt Nam có bao nhiêu tỉnh thành?] và đợi', shape: 'stack' },
      { id: 'c6-3', category: 'control', text: 'nếu <(câu trả lời) = (63)> thì', shape: 'c-block' },
      { id: 'c6-4', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack' }
    ]
  },
  {
    id: 'ch-7-bao-ve-dao',
    challengeNumber: 7,
    title: '⭐ Thử thách 7: Cuộc chiến bảo vệ đảo ngọc',
    grade: 5,
    badgeTitle: 'Thám tử sửa lỗi',
    icon: 'ShieldAlert',
    missionDesc: 'Thuyền hải tặc liên tục áp sát hòn đảo ngọc. Em lập trình tháp pháo bắn đạn bong bóng sử dụng cơ chế Bản sao (Clones)!',
    requirements: [
      'Tháp pháo luôn xoay hướng về phía con trỏ chuột.',
      'Bấm chuột thì tạo bản sao của Đạn bong bóng bay thẳng.',
      'Thuyền địch liên tục tạo bản sao bơi về phía hòn đảo.',
      'Đạn chạm Thuyền thì xóa cả 2 bản sao và cộng điểm.'
    ],
    hint: 'Sử dụng bộ 3 khối bản sao: [tạo bản sao], [khi bắt đầu là bản sao], [xóa bản sao này].',
    successCondition: 'Cơ chế bắn đạn và sinh quái bằng bản sao hoạt động không bị lag giật.',
    xpReward: 90,
    sampleBlocks: [
      { id: 'c7-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c7-2', category: 'control', text: 'khi tôi bắt đầu là một bản sao', shape: 'hat' },
      { id: 'c7-3', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack' },
      { id: 'c7-4', category: 'control', text: 'xóa bản sao này', shape: 'cap' }
    ]
  },
  {
    id: 'ch-8-sang-tao',
    challengeNumber: 8,
    title: '⭐ Thử thách 8: Nhà lập trình nhí sáng tạo',
    grade: 'both',
    badgeTitle: 'Cao thủ Scratch',
    icon: 'Sparkles',
    missionDesc: 'Thử thách đỉnh cao tự do! Tự thiết kế một dự án hoặc trò chơi độc đáo mang đậm phong cách và ý tưởng của riêng em.',
    requirements: [
      'Có cốt truyện hoặc luật chơi rõ ràng.',
      'Kết hợp ít nhất 4 nhóm lệnh khác nhau.',
      'Có âm thanh, hiệu ứng hình ảnh hoặc điểm số.',
      'Chương trình chạy mượt mà, không gặp lỗi kẹt đơ.'
    ],
    hint: 'Em có thể dùng tính năng "Ý tưởng dự án của em" để nhờ AI lập dàn ý hỗ trợ nhé!',
    successCondition: 'Hoàn thành dự án tự chọn hoàn chỉnh và chạy thử thành công trên sân khấu.',
    xpReward: 100,
    sampleBlocks: [
      { id: 'c8-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'c8-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack' },
      { id: 'c8-3', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'c8-4', category: 'looks', text: 'thay đổi hiệu ứng [màu] một lượng 25', shape: 'stack' }
    ]
  }
];

export const STANDARD_BADGES: Badge[] = [
  {
    id: 'b-lam-quen',
    title: '🏅 Làm quen Scratch',
    description: 'Khám phá giao diện Scratch và hoàn thành bài học đầu tiên.',
    icon: 'Compass',
    unlocked: true,
    requirement: 'Hoàn thành Bài 1 chương trình học'
  },
  {
    id: 'b-bac-thay-khoi-lenh',
    title: '🏅 Bậc thầy khối lệnh',
    description: 'Thành thạo các khối lệnh chuyển động, hiển thị, âm thanh và biến số.',
    icon: 'Award',
    unlocked: false,
    requirement: 'Đạt từ 15 bài học hoặc bài tập hoàn thành'
  },
  {
    id: 'b-vua-vong-lap',
    title: '🏅 Vua vòng lặp',
    description: 'Làm chủ bí thuật tối ưu hóa mã nguồn bằng các khối vòng lặp.',
    icon: 'Repeat',
    unlocked: false,
    requirement: 'Hoàn thành bài học về vòng lặp và thử thách liên quan'
  },
  {
    id: 'b-tham-tu-loi',
    title: '🏅 Thám tử sửa lỗi',
    description: 'Tự tay phát hiện và sửa lỗi chương trình trong mục Thám Tử Sửa Lỗi.',
    icon: 'ShieldCheck',
    unlocked: false,
    requirement: 'Sửa thành công lỗi chương trình cùng AI'
  },
  {
    id: 'b-nha-tu-duy-thuat-toan',
    title: '🏅 Nhà tư duy thuật toán',
    description: 'Sắp xếp chuẩn xác các bước logic và giải quyết bài toán tuần tự.',
    icon: 'Cpu',
    unlocked: false,
    requirement: 'Hoàn thành các bài tập sắp xếp thuật toán'
  },
  {
    id: 'b-nha-sang-tao',
    title: '🏅 Nhà sáng tạo',
    description: 'Xây dựng dự án hoàn chỉnh trong Xưởng Sáng Tạo Scratch.',
    icon: 'Sparkles',
    unlocked: false,
    requirement: 'Hoàn thành ít nhất 2 dự án thực hành'
  },
  {
    id: 'b-cao-thu-scratch',
    title: '🏅 Cao thủ Scratch',
    description: 'Tích lũy trên 300 điểm kinh nghiệm (XP) và đạt cấp độ cao.',
    icon: 'Trophy',
    unlocked: false,
    requirement: 'Đạt từ 300 XP trở lên'
  }
];

export const STUDENT_LEVELS = [
  { level: 1, name: '🌱 Người mới bắt đầu', minXP: 0, maxXP: 49 },
  { level: 2, name: '🌿 Nhà khám phá', minXP: 50, maxXP: 99 },
  { level: 3, name: '🌳 Lập trình viên nhí', minXP: 100, maxXP: 199 },
  { level: 4, name: '🚀 Nhà sáng tạo', minXP: 200, maxXP: 349 },
  { level: 5, name: '🏆 Chuyên gia Scratch nhí', minXP: 350, maxXP: 9999 }
];

export const BUG_SCENARIOS: BugScenario[] = [
  {
    id: 'bug-dung-yen',
    title: 'Bấm Cờ Xanh nhưng nhân vật đứng yên như tượng',
    symptom: 'Em đã kéo khối [di chuyển 15 bước] nhưng khi bấm Cờ Xanh trên sân khấu thì chú mèo không nhúc nhích tẹo nào!',
    sampleCode: [
      { id: 'sc1', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack' }
    ],
    whatProgramWantsToDo: 'Cho chú mèo bước tới phía trước khi bắt đầu chương trình.',
    likelyBugBlock: 'Khối lệnh Sự kiện bắt đầu.',
    whereIsBug: 'Ở vị trí đầu tiên của kịch bản lập trình.',
    whyIsBug: 'Các khối lệnh giống như những toa tàu, chúng cần một "đầu tàu" Sự kiện để kích hoạt khi người dùng bấm Cờ Xanh.',
    hint1: 'Em hãy tìm trong nhóm Sự kiện (màu vàng) một khối lệnh có hình chiếc mũ cong mang tên "khi bấm vào cờ xanh" nhé!',
    hint2: 'Gắn khối [khi bấm vào cờ xanh] dính chặt ngay phía trên khối [di chuyển 15 bước] (sẽ nghe tiếng tách lego vui tai!).',
    fullGuide: '1. Vào nhóm Sự kiện (màu vàng rực rỡ).\n2. Kéo khối [khi bấm vào cờ xanh] ra.\n3. Đặt nó dính chặt ngay phía trên khối [di chuyển 15 bước].\n4. Bấm lại Cờ Xanh ở góc trên sân khấu là chú mèo sẽ phi ngay!'
  },
  {
    id: 'bug-chay-bien-mat',
    title: 'Nhân vật chạy tít ra ngoài sân khấu rồi biến mất',
    symptom: 'Chú mèo chạy một mạch sang bên phải rồi biến mất khỏi màn hình, tìm mãi không thấy đâu nữa!',
    sampleCode: [
      { id: 'sc2-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'sc2-2', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'sc2-3', category: 'motion', text: 'di chuyển 10 bước', shape: 'stack' }
    ],
    whatProgramWantsToDo: 'Nhân vật đi tuần tra liên tục qua lại trên sân khấu.',
    likelyBugBlock: 'Thiếu lệnh phản xạ khi chạm mép màn hình.',
    whereIsBug: 'Bên trong vòng lặp liên tục.',
    whyIsBug: 'Vòng lặp liên tục bảo mèo cứ bước tới, nên mèo đi thẳng ra ngoài biên giới sân khấu luôn mà không biết quay lại.',
    hint1: 'Trong nhóm Chuyển động (màu xanh dương) có một khối lệnh mang tên "bật lại nếu chạm cạnh". Em thử tìm xem!',
    hint2: 'Thả khối [bật lại nếu chạm cạnh] vào bên trong lòng khối [liên tục], ngay dưới khối [di chuyển 10 bước].',
    fullGuide: '1. Vào nhóm Chuyển động (màu xanh dương).\n2. Tìm khối [bật lại nếu chạm cạnh].\n3. Kéo và thả vào bên trong khối [liên tục].\n4. Thêm khối [đặt kiểu xoay [trái - phải]] để mèo không bị lộn ngược đầu nhé!'
  },
  {
    id: 'bug-diem-nhay-loan',
    title: 'Điểm số nhảy vù vù như tên lửa chỉ trong 1 giây',
    symptom: 'Vừa mới chạm vào quả táo mà điểm số đã vọt lên 50, 100 điểm khiến trò chơi mất vui!',
    sampleCode: [
      { id: 'sc3-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'sc3-2', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'sc3-3', category: 'control', text: 'nếu <đang chạm [Quả táo]?> thì', shape: 'c-block' },
      { id: 'sc3-4', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack' }
    ],
    whatProgramWantsToDo: 'Mỗi lần hứng trúng 1 quả táo thì chỉ được cộng đúng 1 điểm.',
    likelyBugBlock: 'Quả táo chưa kịp biến mất sau khi được cộng điểm.',
    whereIsBug: 'Ngay phía sau khối lệnh cộng điểm.',
    whyIsBug: 'Máy tính chạy vòng lặp cực nhanh (30 lần mỗi giây). Khi chạm vào táo, táo vẫn nằm im đó nên điểm bị cộng liên tục 30 lần trong tích tắc!',
    hint1: 'Sau khi được cộng điểm, em cần cho quả táo "trốn đi" bằng cách biến mất [ẩn đi] hoặc dịch chuyển tức thì lên đỉnh màn hình!',
    hint2: 'Thêm lệnh [đi tới điểm x: ngẫu nhiên y: 160] ngay sau khi cộng điểm để quả táo nhảy lên trời chuẩn bị rơi lượt tiếp theo.',
    fullGuide: '1. Ngay sau khối [thay đổi [Điểm] một lượng 1], hãy thêm khối đưa quả táo đi chỗ khác: [đi tới điểm x: (lấy ngẫu nhiên từ -200 đến 200) y: 160].\n2. Hoặc thêm khối [đợi 0.5 giây] để điểm chỉ được cộng 1 lần duy nhất!'
  },
  {
    id: 'bug-am-thanh-inh-oi',
    title: 'Tiếng kêu Meow kêu rè rè liên thanh như vấp đĩa',
    symptom: 'Bấm Cờ Xanh thì tiếng mèo kêu phát ra dồn dập như bị vấp đĩa, kêu liên thanh không dứt.',
    sampleCode: [
      { id: 'sc4-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat' },
      { id: 'sc4-2', category: 'control', text: 'liên tục', shape: 'c-block' },
      { id: 'sc4-3', category: 'sound', text: 'bắt đầu âm thanh "Meow"', shape: 'stack' }
    ],
    whatProgramWantsToDo: 'Nhân vật phát ra tiếng kêu Meow rõ ràng từng tiếng một.',
    likelyBugBlock: 'Khối lệnh âm thanh không có khoảng chờ hoàn thành.',
    whereIsBug: 'Bên trong vòng lặp liên tục.',
    whyIsBug: 'Khối [bắt đầu âm thanh] không biết chờ đợi, nó bật lại tiếng meow 30 lần một giây trước khi tiếng kêu kịp phát hết một nhịp.',
    hint1: 'Trong nhóm Âm thanh có khối [phát âm thanh ... đến khi hoàn thành] hoặc em có thể thêm lệnh [đợi 1 giây] sau khi kêu!',
    hint2: 'Thay khối [bắt đầu âm thanh] bằng khối [phát âm thanh [Meow] đến khi hoàn thành].',
    fullGuide: '1. Tháo khối [bắt đầu âm thanh] ra.\n2. Thay bằng khối [phát âm thanh "Meow" đến khi hoàn thành].\n3. Hoặc gắn thêm [đợi 1 giây] ngay dưới tiếng kêu để chú mèo kịp nghỉ lấy hơi nhé!'
  }
];
