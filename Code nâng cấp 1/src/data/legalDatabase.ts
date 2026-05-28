// ============================================
// LEGAL DATABASE - Cơ sở dữ liệu văn bản pháp luật
// ============================================
// LƯU Ý: Đây là MOCK DATA cho mục đích DEMO
// Production cần: PostgreSQL + Vector DB (Qdrant/Pinecone)
// ============================================

export interface LegalDocument {
  id: string;
  type: 'nghi-dinh' | 'thong-tu' | 'luat' | 'quyet-dinh' | 'nghi-quyet';
  number: string;
  title: string;
  issueDate: string;
  effectiveDate: string;
  issuingBody: string;
  summary: string;
  keywords: string[];
  category: string;
  relatedDocuments: string[];
  fullContent: string;
  status: 'active' | 'expired' | 'amended';
  viewCount: number;
}

export const legalDocuments: LegalDocument[] = [
  // ========== ĐẤT ĐAI ==========
  {
    id: 'ld-01',
    type: 'luat',
    number: '31/2024/QH15',
    title: 'Luật Đất đai 2024',
    issueDate: '18/01/2024',
    effectiveDate: '01/08/2024',
    issuingBody: 'Quốc hội',
    summary: 'Luật Đất đai quy định về chế độ sở hữu đất đai, quyền hạn và trách nhiệm của Nhà nước đại diện chủ sở hữu toàn dân về đất đai và thống nhất quản lý về đất đai, chế độ quản lý và sử dụng đất đai, quyền và nghĩa vụ của công dân, người sử dụng đất đối với đất đai thuộc lãnh thổ của nước Cộng hòa xã hội chủ nghĩa Việt Nam.',
    keywords: ['đất đai', 'quyền sử dụng đất', 'chuyển nhượng', 'thu hồi đất', 'bồi thường', 'giải phóng mặt bằng', 'quy hoạch đất', 'sổ đỏ', 'giấy chứng nhận quyền sử dụng đất', 'đăng ký đất đai', 'chuyển mục đích sử dụng đất', 'giao đất', 'cho thuê đất'],
    category: 'Đất đai',
    relatedDocuments: ['NĐ 102/2024/NĐ-CP', 'NĐ 103/2024/NĐ-CP', 'NĐ 104/2024/NĐ-CP'],
    fullContent: `Luật Đất đai 2024 gồm 16 chương, 260 điều, quy định toàn diện về:

**Chương I:** Quy định chung - Phạm vi điều chỉnh, đối tượng áp dụng, giải thích từ ngữ
**Chương II:** Quyền và trách nhiệm của Nhà nước, công dân đối với đất đai
**Chương III:** Quy hoạch, kế hoạch sử dụng đất - Nguyên tắc lập, nội dung, trình tự
**Chương IV:** Thu hồi đất, trưng dụng đất - Các trường hợp thu hồi, trình tự thủ tục
**Chương V:** Bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất
**Chương VI:** Giao đất, cho thuê đất, chuyển mục đích sử dụng đất
**Chương VII:** Đăng ký đất đai, cấp giấy chứng nhận quyền sử dụng đất
**Chương VIII:** Tài chính về đất đai, giá đất - Bảng giá đất, định giá đất
**Chương IX:** Hệ thống thông tin đất đai và cơ sở dữ liệu đất đai
**Chương X:** Chế độ sử dụng các loại đất
**Chương XI:** Quyền và nghĩa vụ của người sử dụng đất
**Chương XII:** Thủ tục hành chính về đất đai
**Chương XIII:** Giám sát, thanh tra, kiểm tra; giải quyết tranh chấp
**Chương XIV:** Trách nhiệm quản lý nhà nước về đất đai
**Chương XV:** Điều khoản chuyển tiếp
**Chương XVI:** Điều khoản thi hành`,
    status: 'active',
    viewCount: 15420,
  },
  {
    id: 'nd-01',
    type: 'nghi-dinh',
    number: '102/2024/NĐ-CP',
    title: 'Nghị định quy định chi tiết thi hành một số điều của Luật Đất đai về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất',
    issueDate: '15/07/2024',
    effectiveDate: '01/08/2024',
    issuingBody: 'Chính phủ',
    summary: 'Nghị định quy định chi tiết về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất; nguyên tắc bồi thường về đất; bồi thường thiệt hại về tài sản, về cây trồng, vật nuôi; hỗ trợ ổn định đời sống và sản xuất; hỗ trợ đào tạo, chuyển đổi nghề; tái định cư.',
    keywords: ['bồi thường', 'thu hồi đất', 'tái định cư', 'giải phóng mặt bằng', 'hỗ trợ', 'đền bù', 'giá đất bồi thường', 'hỗ trợ ổn định đời sống', 'hỗ trợ chuyển đổi nghề', 'phương án bồi thường'],
    category: 'Đất đai',
    relatedDocuments: ['Luật Đất đai 2024', 'NĐ 103/2024/NĐ-CP'],
    fullContent: `Nghị định 102/2024/NĐ-CP hướng dẫn chi tiết:

**Phần I: Quy định chung**
- Phạm vi điều chỉnh và đối tượng áp dụng
- Nguyên tắc bồi thường, hỗ trợ, tái định cư

**Phần II: Bồi thường về đất**
- Điều kiện được bồi thường về đất khi Nhà nước thu hồi đất
- Bồi thường về đất khi thu hồi đất ở
- Bồi thường khi thu hồi đất nông nghiệp
- Bồi thường khi thu hồi đất phi nông nghiệp
- Bồi thường về đất đối với các trường hợp đặc biệt

**Phần III: Bồi thường thiệt hại về tài sản**
- Bồi thường thiệt hại về nhà, công trình xây dựng trên đất
- Bồi thường thiệt hại đối với cây trồng, vật nuôi
- Bồi thường chi phí di chuyển

**Phần IV: Hỗ trợ**
- Hỗ trợ ổn định đời sống và sản xuất
- Hỗ trợ đào tạo, chuyển đổi nghề, tìm kiếm việc làm
- Hỗ trợ khác

**Phần V: Tái định cư**
- Phương án tái định cư, khu tái định cư
- Lập, thẩm định, phê duyệt phương án bồi thường, hỗ trợ, tái định cư`,
    status: 'active',
    viewCount: 8750,
  },
  {
    id: 'nd-02',
    type: 'nghi-dinh',
    number: '103/2024/NĐ-CP',
    title: 'Nghị định quy định về giá đất',
    issueDate: '16/07/2024',
    effectiveDate: '01/08/2024',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về bảng giá đất, giá đất cụ thể; phương pháp định giá đất; tư vấn xác định giá đất; hội đồng thẩm định giá đất.',
    keywords: ['giá đất', 'bảng giá đất', 'định giá đất', 'thẩm định giá đất', 'phương pháp định giá', 'giá đất cụ thể', 'hệ số điều chỉnh giá đất', 'tư vấn giá đất', 'hội đồng thẩm định'],
    category: 'Đất đai',
    relatedDocuments: ['Luật Đất đai 2024', 'NĐ 102/2024/NĐ-CP'],
    fullContent: `Nghị định 103/2024/NĐ-CP quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh, đối tượng áp dụng
- Nguyên tắc định giá đất

**Chương II: Phương pháp định giá đất**
- Phương pháp so sánh trực tiếp
- Phương pháp chiết trừ
- Phương pháp thu nhập
- Phương pháp thặng dư
- Phương pháp hệ số điều chỉnh giá đất

**Chương III: Bảng giá đất**
- Xây dựng bảng giá đất
- Điều chỉnh bảng giá đất
- Công bố bảng giá đất

**Chương IV: Giá đất cụ thể**
- Các trường hợp xác định giá đất cụ thể
- Trình tự xác định giá đất cụ thể

**Chương V: Tư vấn xác định giá đất**
- Điều kiện tổ chức tư vấn
- Quyền và nghĩa vụ của tổ chức tư vấn

**Chương VI: Hội đồng thẩm định giá đất**
- Thành lập, hoạt động
- Giải quyết khiếu nại về giá đất`,
    status: 'active',
    viewCount: 6230,
  },
  {
    id: 'nd-03',
    type: 'nghi-dinh',
    number: '104/2024/NĐ-CP',
    title: 'Nghị định quy định chi tiết thi hành một số điều của Luật Đất đai',
    issueDate: '16/07/2024',
    effectiveDate: '01/08/2024',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về quy hoạch, kế hoạch sử dụng đất; giao đất, cho thuê đất, chuyển mục đích sử dụng đất; đăng ký đất đai, cấp giấy chứng nhận; quyền và nghĩa vụ của người sử dụng đất.',
    keywords: ['quy hoạch đất', 'giao đất', 'cho thuê đất', 'chuyển mục đích sử dụng đất', 'đăng ký đất đai', 'cấp sổ đỏ', 'giấy chứng nhận', 'quyền sử dụng đất', 'chuyển nhượng quyền sử dụng đất', 'thế chấp quyền sử dụng đất', 'tặng cho quyền sử dụng đất'],
    category: 'Đất đai',
    relatedDocuments: ['Luật Đất đai 2024'],
    fullContent: `Nghị định 104/2024/NĐ-CP hướng dẫn:

**Chương I: Quy hoạch, kế hoạch sử dụng đất**
- Quy hoạch, kế hoạch sử dụng đất quốc gia
- Quy hoạch, kế hoạch sử dụng đất cấp tỉnh
- Quy hoạch, kế hoạch sử dụng đất cấp huyện

**Chương II: Giao đất, cho thuê đất**
- Giao đất không thu tiền sử dụng đất
- Giao đất có thu tiền sử dụng đất
- Cho thuê đất trả tiền hàng năm
- Cho thuê đất trả tiền một lần

**Chương III: Chuyển mục đích sử dụng đất**
- Các trường hợp chuyển mục đích sử dụng đất
- Thẩm quyền cho phép chuyển mục đích
- Trình tự, thủ tục

**Chương IV: Đăng ký đất đai, cấp giấy chứng nhận**
- Đăng ký đất đai lần đầu
- Đăng ký biến động
- Cấp giấy chứng nhận quyền sử dụng đất
- Cấp đổi, cấp lại giấy chứng nhận

**Chương V: Quyền và nghĩa vụ của người sử dụng đất**
- Quyền chuyển nhượng
- Quyền cho thuê, cho thuê lại
- Quyền thế chấp, góp vốn
- Quyền thừa kế, tặng cho`,
    status: 'active',
    viewCount: 9100,
  },

  // ========== XÂY DỰNG ==========
  {
    id: 'ld-02',
    type: 'luat',
    number: '50/2014/QH13',
    title: 'Luật Xây dựng 2014 (sửa đổi, bổ sung 2020)',
    issueDate: '18/06/2014',
    effectiveDate: '01/01/2015',
    issuingBody: 'Quốc hội',
    summary: 'Luật quy định về quyền, nghĩa vụ, trách nhiệm của cơ quan, tổ chức, cá nhân và quản lý nhà nước trong hoạt động đầu tư xây dựng.',
    keywords: ['xây dựng', 'giấy phép xây dựng', 'quy hoạch xây dựng', 'quản lý dự án', 'an toàn xây dựng', 'công trình xây dựng', 'cấp phép xây dựng', 'thiết kế xây dựng', 'nghiệm thu công trình', 'hoàn công'],
    category: 'Xây dựng',
    relatedDocuments: ['NĐ 15/2021/NĐ-CP', 'NĐ 06/2021/NĐ-CP'],
    fullContent: `Luật Xây dựng quy định toàn diện về hoạt động xây dựng:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh, đối tượng áp dụng
- Nguyên tắc cơ bản trong hoạt động xây dựng

**Chương II: Quy hoạch xây dựng**
- Quy hoạch xây dựng vùng
- Quy hoạch đô thị
- Quy hoạch nông thôn

**Chương III: Dự án đầu tư xây dựng công trình**
- Lập dự án đầu tư
- Thẩm định, phê duyệt dự án
- Quản lý dự án đầu tư xây dựng

**Chương IV: Khảo sát, thiết kế xây dựng**

**Chương V: Giấy phép xây dựng**
- Các loại giấy phép xây dựng
- Điều kiện cấp phép
- Thẩm quyền cấp phép
- Trình tự, thủ tục

**Chương VI: Xây dựng công trình**
- Thi công xây dựng
- Giám sát thi công
- Nghiệm thu công trình

**Chương VII: Chi phí đầu tư xây dựng**

**Chương VIII: Hợp đồng xây dựng**

**Chương IX: Quản lý chất lượng công trình xây dựng**

**Chương X: An toàn trong thi công xây dựng**`,
    status: 'amended',
    viewCount: 12350,
  },
  {
    id: 'nd-04',
    type: 'nghi-dinh',
    number: '15/2021/NĐ-CP',
    title: 'Nghị định quy định chi tiết một số nội dung về quản lý dự án đầu tư xây dựng',
    issueDate: '03/03/2021',
    effectiveDate: '03/03/2021',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về lập, thẩm định, phê duyệt dự án; quản lý dự án đầu tư xây dựng; giấy phép xây dựng; quản lý trật tự xây dựng.',
    keywords: ['quản lý dự án', 'giấy phép xây dựng', 'thẩm định dự án', 'phê duyệt dự án', 'xây dựng', 'trật tự xây dựng', 'cấp phép', 'xây dựng không phép', 'xử phạt xây dựng', 'điều kiện cấp phép'],
    category: 'Xây dựng',
    relatedDocuments: ['Luật Xây dựng 2014'],
    fullContent: `Nghị định 15/2021/NĐ-CP quy định:

**Chương I: Lập, thẩm định, phê duyệt dự án đầu tư xây dựng**
- Trình tự lập dự án
- Nội dung dự án đầu tư xây dựng
- Thẩm định dự án
- Phê duyệt dự án

**Chương II: Quản lý dự án đầu tư xây dựng**
- Hình thức quản lý dự án
- Điều kiện năng lực của tổ chức, cá nhân

**Chương III: Giấy phép xây dựng**
- Đối tượng cấp giấy phép xây dựng
- Điều kiện cấp giấy phép
- Thẩm quyền cấp giấy phép xây dựng
- Trình tự, thủ tục cấp giấy phép
- Thời hạn giấy phép xây dựng
- Điều chỉnh, gia hạn giấy phép
- Cấp lại, thu hồi giấy phép

**Chương IV: Xây dựng công trình đặc thù**
- Công trình bí mật nhà nước
- Công trình theo lệnh khẩn cấp
- Công trình tạm

**Chương V: Quản lý chi phí đầu tư xây dựng**

**Chương VI: Hợp đồng xây dựng**`,
    status: 'active',
    viewCount: 7820,
  },

  // ========== HỘ TỊCH ==========
  {
    id: 'ld-03',
    type: 'luat',
    number: '60/2014/QH13',
    title: 'Luật Hộ tịch 2014',
    issueDate: '20/11/2014',
    effectiveDate: '01/01/2016',
    issuingBody: 'Quốc hội',
    summary: 'Luật quy định về hộ tịch; quyền, nghĩa vụ, trách nhiệm của cơ quan, tổ chức, cá nhân trong đăng ký và quản lý hộ tịch.',
    keywords: ['hộ tịch', 'khai sinh', 'khai tử', 'kết hôn', 'đăng ký kết hôn', 'giấy khai sinh', 'ly hôn', 'nhận cha mẹ con', 'thay đổi họ tên', 'cải chính hộ tịch', 'đăng ký giám hộ', 'xác định lại giới tính'],
    category: 'Hộ tịch - Tư pháp',
    relatedDocuments: ['NĐ 123/2015/NĐ-CP'],
    fullContent: `Luật Hộ tịch quy định về:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh, đối tượng áp dụng
- Quyền, nghĩa vụ đăng ký hộ tịch
- Nguyên tắc đăng ký hộ tịch

**Chương II: Đăng ký khai sinh**
- Thẩm quyền đăng ký
- Trình tự, thủ tục đăng ký khai sinh
- Nội dung Giấy khai sinh
- Đăng ký khai sinh quá hạn

**Chương III: Đăng ký kết hôn**
- Điều kiện kết hôn
- Thủ tục đăng ký kết hôn
- Giấy chứng nhận kết hôn

**Chương IV: Đăng ký khai tử**
- Trình tự, thủ tục đăng ký khai tử
- Trích lục khai tử

**Chương V: Đăng ký nhận cha, mẹ, con**
- Điều kiện nhận cha, mẹ, con
- Thủ tục đăng ký

**Chương VI: Đăng ký giám hộ**

**Chương VII: Đăng ký thay đổi, cải chính hộ tịch**
- Thay đổi họ, chữ đệm, tên
- Cải chính hộ tịch
- Xác định lại giới tính

**Chương VIII: Ghi vào sổ hộ tịch việc thay đổi hộ tịch theo bản án, quyết định**

**Chương IX: Cơ sở dữ liệu hộ tịch điện tử**`,
    status: 'active',
    viewCount: 11200,
  },
  {
    id: 'nd-05',
    type: 'nghi-dinh',
    number: '123/2015/NĐ-CP',
    title: 'Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Hộ tịch',
    issueDate: '15/11/2015',
    effectiveDate: '01/01/2016',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về đăng ký hộ tịch; trình tự, thủ tục đăng ký các sự kiện hộ tịch; quản lý và sử dụng sổ hộ tịch.',
    keywords: ['hộ tịch', 'đăng ký khai sinh', 'đăng ký kết hôn', 'thủ tục hộ tịch', 'sổ hộ tịch', 'khai sinh trễ hạn', 'khai sinh quá hạn', 'bổ sung hộ tịch', 'trích lục hộ tịch', 'bản sao giấy khai sinh'],
    category: 'Hộ tịch - Tư pháp',
    relatedDocuments: ['Luật Hộ tịch 2014'],
    fullContent: `Nghị định 123/2015/NĐ-CP hướng dẫn:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Giải thích từ ngữ
- Thẩm quyền đăng ký hộ tịch

**Chương II: Đăng ký khai sinh**
- Trình tự đăng ký khai sinh trong hạn
- Đăng ký khai sinh quá hạn
- Đăng ký khai sinh cho trẻ bị bỏ rơi
- Đăng ký khai sinh kết hợp nhận cha, mẹ, con

**Chương III: Đăng ký kết hôn**
- Trình tự đăng ký kết hôn
- Tổ chức lễ đăng ký kết hôn

**Chương IV: Đăng ký khai tử**
- Trình tự đăng ký khai tử
- Đăng ký khai tử quá hạn

**Chương V: Đăng ký hộ tịch có yếu tố nước ngoài**
- Đăng ký khai sinh có yếu tố nước ngoài
- Đăng ký kết hôn có yếu tố nước ngoài

**Chương VI: Cấp bản sao trích lục hộ tịch**

**Chương VII: Quản lý, sử dụng sổ hộ tịch, biểu mẫu hộ tịch**`,
    status: 'active',
    viewCount: 8950,
  },

  // ========== THUẾ ==========
  {
    id: 'nd-06',
    type: 'nghi-dinh',
    number: '126/2020/NĐ-CP',
    title: 'Nghị định quy định chi tiết một số điều của Luật Quản lý thuế',
    issueDate: '19/10/2020',
    effectiveDate: '05/12/2020',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về đăng ký thuế, khai thuế, nộp thuế, ấn định thuế, hoàn thuế, miễn thuế, giảm thuế.',
    keywords: ['thuế', 'quản lý thuế', 'khai thuế', 'nộp thuế', 'hoàn thuế', 'miễn thuế', 'giảm thuế', 'mã số thuế', 'đăng ký thuế', 'quyết toán thuế', 'thuế thu nhập', 'thuế GTGT'],
    category: 'Thuế - Tài chính',
    relatedDocuments: ['Luật Quản lý thuế 2019'],
    fullContent: `Nghị định 126/2020/NĐ-CP quy định:

**Chương I: Đăng ký thuế**
- Đối tượng đăng ký thuế
- Hồ sơ đăng ký thuế
- Trình tự, thủ tục đăng ký
- Cấp mã số thuế

**Chương II: Khai thuế, tính thuế**
- Hồ sơ khai thuế
- Thời hạn nộp hồ sơ khai thuế
- Khai bổ sung hồ sơ khai thuế

**Chương III: Ấn định thuế**
- Các trường hợp ấn định thuế
- Căn cứ ấn định thuế

**Chương IV: Thời hạn nộp thuế, gia hạn nộp thuế**
- Thời hạn nộp thuế
- Các trường hợp được gia hạn
- Thủ tục gia hạn

**Chương V: Hoàn thuế**
- Các trường hợp được hoàn thuế
- Hồ sơ hoàn thuế
- Trình tự, thủ tục hoàn thuế

**Chương VI: Miễn thuế, giảm thuế**

**Chương VII: Xóa nợ tiền thuế, tiền chậm nộp, tiền phạt**

**Chương VIII: Quản lý thuế đối với doanh nghiệp có giao dịch liên kết**`,
    status: 'active',
    viewCount: 6780,
  },

  // ========== MÔI TRƯỜNG ==========
  {
    id: 'nd-07',
    type: 'nghi-dinh',
    number: '08/2022/NĐ-CP',
    title: 'Nghị định quy định chi tiết một số điều của Luật Bảo vệ môi trường',
    issueDate: '10/01/2022',
    effectiveDate: '10/01/2022',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về đánh giá tác động môi trường, giấy phép môi trường, bảo vệ môi trường trong hoạt động sản xuất kinh doanh.',
    keywords: ['môi trường', 'đánh giá tác động môi trường', 'giấy phép môi trường', 'ĐTM', 'ô nhiễm', 'xử lý chất thải', 'bảo vệ môi trường', 'quan trắc môi trường', 'chất thải nguy hại', 'nước thải'],
    category: 'Môi trường',
    relatedDocuments: ['Luật Bảo vệ môi trường 2020'],
    fullContent: `Nghị định 08/2022/NĐ-CP quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Đối tượng áp dụng

**Chương II: Đánh giá tác động môi trường**
- Đối tượng phải thực hiện ĐTM
- Nội dung báo cáo ĐTM
- Thẩm định, phê duyệt báo cáo ĐTM

**Chương III: Giấy phép môi trường**
- Đối tượng phải có giấy phép môi trường
- Thẩm quyền cấp giấy phép
- Trình tự, thủ tục cấp giấy phép
- Nội dung giấy phép môi trường

**Chương IV: Đăng ký môi trường**
- Đối tượng đăng ký môi trường
- Nội dung đăng ký môi trường

**Chương V: Bảo vệ môi trường trong hoạt động sản xuất, kinh doanh**
- Yêu cầu về bảo vệ môi trường
- Quan trắc môi trường

**Chương VI: Quản lý chất thải**
- Quản lý chất thải rắn sinh hoạt
- Quản lý chất thải rắn công nghiệp
- Quản lý chất thải nguy hại
- Quản lý nước thải`,
    status: 'active',
    viewCount: 5430,
  },

  // ========== LAO ĐỘNG ==========
  {
    id: 'nd-08',
    type: 'nghi-dinh',
    number: '145/2020/NĐ-CP',
    title: 'Nghị định quy định chi tiết và hướng dẫn thi hành một số điều của Bộ luật Lao động',
    issueDate: '14/12/2020',
    effectiveDate: '01/02/2021',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về hợp đồng lao động, cho thuê lại lao động, tiền lương, thời giờ làm việc, nghỉ ngơi, kỷ luật lao động.',
    keywords: ['lao động', 'hợp đồng lao động', 'tiền lương', 'bảo hiểm xã hội', 'nghỉ phép', 'kỷ luật lao động', 'sa thải', 'cho thôi việc', 'nghỉ việc', 'chấm dứt hợp đồng', 'bồi thường khi nghỉ việc'],
    category: 'Lao động',
    relatedDocuments: ['Bộ luật Lao động 2019'],
    fullContent: `Nghị định 145/2020/NĐ-CP quy định:

**Chương I: Quản lý lao động**
- Sổ quản lý lao động
- Báo cáo sử dụng lao động

**Chương II: Hợp đồng lao động**
- Giao kết hợp đồng lao động
- Nội dung hợp đồng lao động
- Thực hiện hợp đồng lao động
- Chấm dứt hợp đồng lao động
- Trợ cấp thôi việc, mất việc làm

**Chương III: Cho thuê lại lao động**
- Điều kiện cho thuê lại lao động
- Doanh nghiệp cho thuê lại lao động
- Quyền và nghĩa vụ các bên

**Chương IV: Tiền lương**
- Mức lương tối thiểu
- Thang lương, bảng lương
- Phụ cấp lương

**Chương V: Thời giờ làm việc, thời giờ nghỉ ngơi**
- Thời giờ làm việc bình thường
- Làm thêm giờ
- Nghỉ hàng tuần, nghỉ lễ, nghỉ phép

**Chương VI: Kỷ luật lao động, trách nhiệm vật chất**
- Hình thức xử lý kỷ luật
- Trình tự xử lý kỷ luật

**Chương VII: Lao động nữ và bảo đảm bình đẳng giới**

**Chương VIII: Lao động là người nước ngoài**`,
    status: 'active',
    viewCount: 9320,
  },

  // ========== DOANH NGHIỆP ==========
  {
    id: 'nd-09',
    type: 'nghi-dinh',
    number: '01/2021/NĐ-CP',
    title: 'Nghị định về đăng ký doanh nghiệp',
    issueDate: '04/01/2021',
    effectiveDate: '04/01/2021',
    issuingBody: 'Chính phủ',
    summary: 'Quy định chi tiết về hồ sơ, trình tự, thủ tục đăng ký doanh nghiệp; đăng ký hộ kinh doanh; quản lý nhà nước về đăng ký doanh nghiệp.',
    keywords: ['đăng ký doanh nghiệp', 'thành lập doanh nghiệp', 'giấy phép kinh doanh', 'đăng ký kinh doanh', 'hộ kinh doanh', 'giải thể doanh nghiệp', 'mã số doanh nghiệp', 'công ty TNHH', 'công ty cổ phần', 'doanh nghiệp tư nhân'],
    category: 'Doanh nghiệp',
    relatedDocuments: ['Luật Doanh nghiệp 2020'],
    fullContent: `Nghị định 01/2021/NĐ-CP quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Đối tượng áp dụng
- Cơ quan đăng ký kinh doanh

**Chương II: Hồ sơ đăng ký doanh nghiệp**
- Hồ sơ đăng ký doanh nghiệp tư nhân
- Hồ sơ đăng ký công ty TNHH
- Hồ sơ đăng ký công ty cổ phần
- Hồ sơ đăng ký công ty hợp danh

**Chương III: Trình tự, thủ tục đăng ký thành lập doanh nghiệp**
- Nộp hồ sơ đăng ký
- Tiếp nhận và xử lý hồ sơ
- Cấp Giấy chứng nhận đăng ký doanh nghiệp

**Chương IV: Đăng ký thay đổi nội dung đăng ký doanh nghiệp**

**Chương V: Thông báo thay đổi nội dung đăng ký doanh nghiệp**

**Chương VI: Đăng ký tạm ngừng, tiếp tục kinh doanh**

**Chương VII: Giải thể doanh nghiệp**
- Điều kiện giải thể
- Thủ tục giải thể
- Hoàn tất giải thể

**Chương VIII: Thu hồi Giấy chứng nhận đăng ký doanh nghiệp**

**Chương IX: Đăng ký hộ kinh doanh**`,
    status: 'active',
    viewCount: 10500,
  },

  // ========== CHỨNG THỰC ==========
  {
    id: 'nd-10',
    type: 'nghi-dinh',
    number: '23/2015/NĐ-CP',
    title: 'Nghị định về cấp bản sao từ sổ gốc, chứng thực bản sao từ bản chính, chứng thực chữ ký và chứng thực hợp đồng, giao dịch',
    issueDate: '16/02/2015',
    effectiveDate: '10/04/2015',
    issuingBody: 'Chính phủ',
    summary: 'Quy định về thẩm quyền, thủ tục cấp bản sao từ sổ gốc; chứng thực bản sao từ bản chính; chứng thực chữ ký; chứng thực hợp đồng, giao dịch.',
    keywords: ['chứng thực', 'bản sao', 'chứng thực bản sao', 'chứng thực chữ ký', 'công chứng', 'hợp đồng', 'giao dịch', 'sổ gốc', 'bản chính', 'phí chứng thực', 'UBND xã chứng thực'],
    category: 'Tư pháp',
    relatedDocuments: [],
    fullContent: `Nghị định 23/2015/NĐ-CP quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Giải thích từ ngữ
- Nguyên tắc chứng thực

**Chương II: Cấp bản sao từ sổ gốc**
- Thẩm quyền cấp bản sao từ sổ gốc
- Thủ tục cấp bản sao từ sổ gốc
- Giá trị pháp lý của bản sao

**Chương III: Chứng thực bản sao từ bản chính**
- Thẩm quyền chứng thực bản sao
- Thủ tục chứng thực bản sao
- Từ chối chứng thực bản sao
- Giá trị pháp lý của bản sao được chứng thực

**Chương IV: Chứng thực chữ ký**
- Thẩm quyền chứng thực chữ ký
- Thủ tục chứng thực chữ ký
- Chứng thực chữ ký người dịch

**Chương V: Chứng thực hợp đồng, giao dịch**
- Thẩm quyền chứng thực hợp đồng, giao dịch
- Thủ tục chứng thực hợp đồng, giao dịch
- Trách nhiệm của người yêu cầu chứng thực
- Trách nhiệm của người thực hiện chứng thực

**Chương VI: Phí chứng thực**

**Chương VII: Giá trị pháp lý của bản sao, chữ ký được chứng thực**`,
    status: 'active',
    viewCount: 13200,
  },

  // ========== THỦ TỤC HÀNH CHÍNH ==========
  {
    id: 'nd-11',
    type: 'nghi-dinh',
    number: '63/2010/NĐ-CP',
    title: 'Nghị định về kiểm soát thủ tục hành chính',
    issueDate: '08/06/2010',
    effectiveDate: '14/10/2010',
    issuingBody: 'Chính phủ',
    summary: 'Quy định về kiểm soát quy định về thủ tục hành chính; kiểm soát việc thực hiện thủ tục hành chính; tiếp nhận, xử lý phản ánh, kiến nghị về quy định hành chính.',
    keywords: ['thủ tục hành chính', 'một cửa', 'kiểm soát', 'phản ánh', 'kiến nghị', 'dịch vụ công', 'cải cách hành chính', 'TTHC', 'công bố TTHC', 'rà soát TTHC'],
    category: 'Hành chính',
    relatedDocuments: ['NĐ 61/2018/NĐ-CP'],
    fullContent: `Nghị định 63/2010/NĐ-CP quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Nguyên tắc kiểm soát thủ tục hành chính

**Chương II: Kiểm soát quy định về thủ tục hành chính**
- Đánh giá tác động của thủ tục hành chính
- Thẩm định thủ tục hành chính
- Công bố, công khai thủ tục hành chính

**Chương III: Rà soát, đánh giá thủ tục hành chính**
- Nguyên tắc rà soát
- Nội dung rà soát
- Trình tự rà soát

**Chương IV: Tiếp nhận, xử lý phản ánh, kiến nghị**
- Tiếp nhận phản ánh, kiến nghị
- Phân loại, xử lý phản ánh, kiến nghị
- Công khai kết quả xử lý

**Chương V: Trách nhiệm kiểm soát thủ tục hành chính**

**Chương VI: Điều khoản thi hành**`,
    status: 'active',
    viewCount: 4560,
  },
  {
    id: 'nd-12',
    type: 'nghi-dinh',
    number: '61/2018/NĐ-CP',
    title: 'Nghị định về thực hiện cơ chế một cửa, một cửa liên thông trong giải quyết thủ tục hành chính',
    issueDate: '23/04/2018',
    effectiveDate: '21/06/2018',
    issuingBody: 'Chính phủ',
    summary: 'Quy định về việc thực hiện cơ chế một cửa, một cửa liên thông trong giải quyết thủ tục hành chính tại các cơ quan hành chính nhà nước các cấp.',
    keywords: ['một cửa', 'một cửa liên thông', 'thủ tục hành chính', 'tiếp nhận hồ sơ', 'trả kết quả', 'bộ phận một cửa', 'trung tâm hành chính công', 'dịch vụ công trực tuyến'],
    category: 'Hành chính',
    relatedDocuments: ['NĐ 63/2010/NĐ-CP'],
    fullContent: `Nghị định 61/2018/NĐ-CP quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Nguyên tắc thực hiện cơ chế một cửa, một cửa liên thông
- Giải thích từ ngữ

**Chương II: Tổ chức Bộ phận Một cửa**
- Bộ phận Một cửa cấp bộ
- Trung tâm Phục vụ hành chính công cấp tỉnh
- Bộ phận Một cửa cấp huyện
- Bộ phận Một cửa cấp xã

**Chương III: Quy trình giải quyết thủ tục hành chính**
- Tiếp nhận hồ sơ
- Chuyển hồ sơ
- Giải quyết hồ sơ
- Trả kết quả

**Chương IV: Trả kết quả giải quyết thủ tục hành chính**
- Hình thức trả kết quả
- Thời gian trả kết quả

**Chương V: Đánh giá việc giải quyết thủ tục hành chính**
- Nội dung đánh giá
- Hình thức đánh giá

**Chương VI: Ứng dụng công nghệ thông tin**
- Hệ thống thông tin một cửa điện tử
- Dịch vụ công trực tuyến`,
    status: 'active',
    viewCount: 7890,
  },

  // ========== CÔNG CHỨNG ==========
  {
    id: 'ld-04',
    type: 'luat',
    number: '53/2014/QH13',
    title: 'Luật Công chứng 2014',
    issueDate: '20/06/2014',
    effectiveDate: '01/01/2015',
    issuingBody: 'Quốc hội',
    summary: 'Quy định về công chứng viên, tổ chức hành nghề công chứng, thủ tục công chứng, quản lý nhà nước về công chứng.',
    keywords: ['công chứng', 'công chứng viên', 'hợp đồng công chứng', 'văn phòng công chứng', 'phòng công chứng', 'chứng nhận', 'văn bản công chứng', 'phí công chứng', 'thù lao công chứng'],
    category: 'Tư pháp',
    relatedDocuments: ['NĐ 29/2015/NĐ-CP'],
    fullContent: `Luật Công chứng 2014 quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Công chứng và giá trị pháp lý của văn bản công chứng
- Nguyên tắc hành nghề công chứng

**Chương II: Công chứng viên**
- Tiêu chuẩn công chứng viên
- Bổ nhiệm công chứng viên
- Miễn nhiệm, thu hồi quyết định bổ nhiệm
- Quyền và nghĩa vụ của công chứng viên

**Chương III: Tổ chức hành nghề công chứng**
- Phòng công chứng
- Văn phòng công chứng
- Thành lập, đăng ký hoạt động

**Chương IV: Thủ tục công chứng hợp đồng, giao dịch**
- Người yêu cầu công chứng
- Tiếp nhận yêu cầu công chứng
- Công chứng hợp đồng, giao dịch
- Ký văn bản công chứng

**Chương V: Công chứng bản dịch**
- Điều kiện công chứng bản dịch
- Thủ tục công chứng bản dịch

**Chương VI: Lưu trữ hồ sơ công chứng**

**Chương VII: Phí công chứng, thù lao công chứng**

**Chương VIII: Quản lý nhà nước về công chứng**`,
    status: 'active',
    viewCount: 8760,
  },

  // ========== KHIẾU NẠI TỐ CÁO ==========
  {
    id: 'ld-05',
    type: 'luat',
    number: '02/2011/QH13',
    title: 'Luật Khiếu nại 2011',
    issueDate: '11/11/2011',
    effectiveDate: '01/07/2012',
    issuingBody: 'Quốc hội',
    summary: 'Quy định về khiếu nại và giải quyết khiếu nại đối với quyết định hành chính, hành vi hành chính của cơ quan hành chính nhà nước.',
    keywords: ['khiếu nại', 'giải quyết khiếu nại', 'quyết định hành chính', 'hành vi hành chính', 'đơn khiếu nại', 'thời hạn khiếu nại', 'thẩm quyền giải quyết', 'khiếu nại lần hai'],
    category: 'Khiếu nại - Tố cáo',
    relatedDocuments: ['NĐ 124/2020/NĐ-CP', 'Luật Tố cáo 2018'],
    fullContent: `Luật Khiếu nại 2011 quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Khiếu nại và quyền khiếu nại
- Nguyên tắc giải quyết khiếu nại

**Chương II: Khiếu nại quyết định hành chính, hành vi hành chính**
- Quyền, nghĩa vụ của người khiếu nại
- Quyền, nghĩa vụ của người bị khiếu nại
- Thời hiệu khiếu nại

**Chương III: Trình tự, thủ tục giải quyết khiếu nại**
- Tiếp nhận đơn khiếu nại
- Thụ lý khiếu nại
- Xác minh nội dung khiếu nại

**Chương IV: Giải quyết khiếu nại lần đầu**
- Thẩm quyền giải quyết
- Thời hạn giải quyết
- Quyết định giải quyết khiếu nại

**Chương V: Giải quyết khiếu nại lần hai**
- Thẩm quyền giải quyết
- Thời hạn giải quyết
- Quyết định giải quyết khiếu nại lần hai

**Chương VI: Thi hành quyết định giải quyết khiếu nại**

**Chương VII: Xử lý vi phạm**`,
    status: 'active',
    viewCount: 5670,
  },

  // ========== HÔN NHÂN GIA ĐÌNH ==========
  {
    id: 'ld-06',
    type: 'luat',
    number: '52/2014/QH13',
    title: 'Luật Hôn nhân và Gia đình 2014',
    issueDate: '19/06/2014',
    effectiveDate: '01/01/2015',
    issuingBody: 'Quốc hội',
    summary: 'Quy định chế độ hôn nhân và gia đình; chuẩn mực pháp lý cho cách ứng xử giữa các thành viên gia đình.',
    keywords: ['hôn nhân', 'gia đình', 'kết hôn', 'ly hôn', 'tài sản chung', 'tài sản riêng', 'quyền nuôi con', 'cấp dưỡng', 'giám hộ', 'điều kiện kết hôn', 'đăng ký kết hôn'],
    category: 'Hôn nhân - Gia đình',
    relatedDocuments: ['NĐ 126/2014/NĐ-CP'],
    fullContent: `Luật Hôn nhân và Gia đình 2014 quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Bảo vệ chế độ hôn nhân và gia đình
- Nguyên tắc cơ bản của chế độ hôn nhân và gia đình

**Chương II: Kết hôn**
- Điều kiện kết hôn
- Đăng ký kết hôn
- Các trường hợp cấm kết hôn
- Hủy việc kết hôn trái pháp luật

**Chương III: Quan hệ giữa vợ và chồng**
- Quyền và nghĩa vụ về nhân thân
- Đại diện giữa vợ và chồng

**Chương IV: Quan hệ giữa cha mẹ và con**
- Quyền và nghĩa vụ của cha mẹ
- Quyền và nghĩa vụ của con

**Chương V: Chế độ tài sản của vợ chồng**
- Tài sản chung của vợ chồng
- Tài sản riêng của vợ, chồng
- Chia tài sản chung trong thời kỳ hôn nhân

**Chương VI: Ly hôn**
- Quyền yêu cầu ly hôn
- Ly hôn thuận tình
- Ly hôn theo yêu cầu một bên
- Hậu quả của ly hôn

**Chương VII: Quyền và nghĩa vụ của cha mẹ, con sau ly hôn**

**Chương VIII: Cấp dưỡng**

**Chương IX: Quan hệ hôn nhân có yếu tố nước ngoài**`,
    status: 'active',
    viewCount: 9450,
  },

  // ========== QUỐC TỊCH ==========
  {
    id: 'ld-07',
    type: 'luat',
    number: '24/2008/QH12',
    title: 'Luật Quốc tịch Việt Nam 2008 (sửa đổi, bổ sung 2014)',
    issueDate: '13/11/2008',
    effectiveDate: '01/07/2009',
    issuingBody: 'Quốc hội',
    summary: 'Quy định về quốc tịch Việt Nam, điều kiện, trình tự nhập, trở lại, thôi, tước quốc tịch Việt Nam.',
    keywords: ['quốc tịch', 'nhập quốc tịch', 'thôi quốc tịch', 'trở lại quốc tịch', 'tước quốc tịch', 'xác nhận quốc tịch', 'giữ quốc tịch', 'đăng ký giữ quốc tịch'],
    category: 'Tư pháp',
    relatedDocuments: ['NĐ 16/2020/NĐ-CP'],
    fullContent: `Luật Quốc tịch Việt Nam quy định:

**Chương I: Quy định chung**
- Quốc tịch Việt Nam
- Nguyên tắc quốc tịch
- Quyền có quốc tịch

**Chương II: Có quốc tịch Việt Nam**
- Căn cứ xác định có quốc tịch Việt Nam
- Quốc tịch của trẻ em sinh ra tại Việt Nam
- Quốc tịch của trẻ em bị bỏ rơi

**Chương III: Nhập quốc tịch Việt Nam**
- Điều kiện nhập quốc tịch
- Hồ sơ xin nhập quốc tịch
- Thẩm quyền, thủ tục giải quyết

**Chương IV: Trở lại quốc tịch Việt Nam**
- Điều kiện trở lại quốc tịch
- Thủ tục trở lại quốc tịch

**Chương V: Mất quốc tịch Việt Nam**
- Thôi quốc tịch Việt Nam
- Tước quốc tịch Việt Nam
- Hủy bỏ quyết định cho nhập quốc tịch

**Chương VI: Thay đổi quốc tịch của người chưa thành niên, con nuôi**

**Chương VII: Đăng ký giữ quốc tịch Việt Nam**

**Chương VIII: Xác nhận có quốc tịch Việt Nam**

**Chương IX: Giấy xác nhận có quốc tịch Việt Nam**`,
    status: 'amended',
    viewCount: 4230,
  },

  // ========== NUÔI CON NUÔI ==========
  {
    id: 'ld-08',
    type: 'luat',
    number: '52/2010/QH12',
    title: 'Luật Nuôi con nuôi 2010',
    issueDate: '17/06/2010',
    effectiveDate: '01/01/2011',
    issuingBody: 'Quốc hội',
    summary: 'Quy định về nuôi con nuôi trong nước và nuôi con nuôi có yếu tố nước ngoài; điều kiện, trình tự, thủ tục đăng ký nuôi con nuôi.',
    keywords: ['nuôi con nuôi', 'đăng ký nuôi con nuôi', 'con nuôi', 'cha mẹ nuôi', 'giám hộ', 'nhận con nuôi', 'điều kiện nhận con nuôi', 'trẻ em được nhận làm con nuôi'],
    category: 'Tư pháp',
    relatedDocuments: ['NĐ 19/2011/NĐ-CP'],
    fullContent: `Luật Nuôi con nuôi quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Mục đích nuôi con nuôi
- Nguyên tắc giải quyết nuôi con nuôi

**Chương II: Điều kiện nuôi con nuôi**
- Điều kiện của người nhận con nuôi
- Điều kiện của người được nhận làm con nuôi
- Sự đồng ý cho làm con nuôi

**Chương III: Đăng ký nuôi con nuôi trong nước**
- Thẩm quyền đăng ký
- Hồ sơ đăng ký
- Trình tự, thủ tục đăng ký

**Chương IV: Nuôi con nuôi có yếu tố nước ngoài**
- Điều kiện nuôi con nuôi có yếu tố nước ngoài
- Thẩm quyền giải quyết
- Trình tự, thủ tục

**Chương V: Quyền và nghĩa vụ của cha mẹ nuôi và con nuôi**
- Quyền và nghĩa vụ của cha mẹ nuôi
- Quyền và nghĩa vụ của con nuôi

**Chương VI: Chấm dứt việc nuôi con nuôi**
- Các trường hợp chấm dứt
- Hậu quả của việc chấm dứt`,
    status: 'active',
    viewCount: 3450,
  },

  // ========== LÝ LỊCH TƯ PHÁP ==========
  {
    id: 'ld-09',
    type: 'luat',
    number: '28/2009/QH12',
    title: 'Luật Lý lịch tư pháp 2009',
    issueDate: '17/06/2009',
    effectiveDate: '01/07/2010',
    issuingBody: 'Quốc hội',
    summary: 'Quy định về quản lý lý lịch tư pháp, cấp Phiếu lý lịch tư pháp.',
    keywords: ['lý lịch tư pháp', 'phiếu lý lịch tư pháp', 'tiền án', 'tiền sự', 'xóa án tích', 'cấp phiếu', 'phiếu số 1', 'phiếu số 2', 'không tiền án'],
    category: 'Tư pháp',
    relatedDocuments: ['NĐ 111/2010/NĐ-CP'],
    fullContent: `Luật Lý lịch tư pháp quy định:

**Chương I: Quy định chung**
- Phạm vi điều chỉnh
- Lý lịch tư pháp
- Nguyên tắc quản lý lý lịch tư pháp

**Chương II: Cơ sở dữ liệu lý lịch tư pháp**
- Xây dựng cơ sở dữ liệu
- Nội dung thông tin lý lịch tư pháp
- Cập nhật thông tin

**Chương III: Cập nhật, xử lý thông tin lý lịch tư pháp**
- Nguồn thông tin
- Cập nhật thông tin
- Xử lý thông tin

**Chương IV: Cấp Phiếu lý lịch tư pháp**
- Phiếu lý lịch tư pháp số 1
- Phiếu lý lịch tư pháp số 2
- Thẩm quyền cấp phiếu
- Trình tự, thủ tục cấp phiếu

**Chương V: Xóa án tích trong lý lịch tư pháp**
- Điều kiện xóa án tích
- Thủ tục xóa án tích

**Chương VI: Quản lý nhà nước về lý lịch tư pháp**`,
    status: 'active',
    viewCount: 6780,
  },

  // ========== DÂN SỰ ==========
  {
    id: 'ld-10',
    type: 'luat',
    number: '91/2015/QH13',
    title: 'Bộ luật Dân sự 2015',
    issueDate: '24/11/2015',
    effectiveDate: '01/01/2017',
    issuingBody: 'Quốc hội',
    summary: 'Quy định địa vị pháp lý, chuẩn mực pháp lý cho cách ứng xử của cá nhân, pháp nhân; quyền, nghĩa vụ về nhân thân và tài sản.',
    keywords: ['dân sự', 'hợp đồng', 'tài sản', 'quyền sở hữu', 'thừa kế', 'bồi thường thiệt hại', 'nghĩa vụ dân sự', 'giao dịch dân sự', 'đại diện', 'thời hiệu', 'di chúc'],
    category: 'Dân sự',
    relatedDocuments: [],
    fullContent: `Bộ luật Dân sự 2015 quy định:

**Phần thứ nhất: Quy định chung**
- Phạm vi điều chỉnh
- Nguyên tắc cơ bản của pháp luật dân sự
- Áp dụng pháp luật dân sự

**Phần thứ hai: Quyền và nghĩa vụ dân sự của cá nhân, pháp nhân**
- Cá nhân
- Pháp nhân
- Hộ gia đình, tổ hợp tác

**Phần thứ ba: Quyền sở hữu và các quyền khác đối với tài sản**
- Quyền sở hữu
- Quyền khác đối với tài sản
- Bảo vệ quyền sở hữu

**Phần thứ tư: Nghĩa vụ và hợp đồng**
- Quy định chung về nghĩa vụ
- Hợp đồng dân sự
- Thực hiện hợp đồng
- Trách nhiệm do vi phạm nghĩa vụ

**Phần thứ năm: Thừa kế**
- Quy định chung về thừa kế
- Thừa kế theo di chúc
- Thừa kế theo pháp luật
- Thanh toán và phân chia di sản

**Phần thứ sáu: Bồi thường thiệt hại ngoài hợp đồng**
- Căn cứ phát sinh trách nhiệm
- Xác định thiệt hại
- Bồi thường thiệt hại

**Phần thứ bảy: Pháp luật áp dụng đối với quan hệ dân sự có yếu tố nước ngoài**`,
    status: 'active',
    viewCount: 14500,
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getDocumentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'nghi-dinh': 'Nghị định',
    'thong-tu': 'Thông tư',
    'luat': 'Luật',
    'quyet-dinh': 'Quyết định',
    'nghi-quyet': 'Nghị quyết',
    'chi-thi': 'Chỉ thị',
    'cong-van': 'Công văn',
  };
  return labels[type] || type;
};

export const getStatusLabel = (status: string): { text: string; color: string } => {
  const labels: Record<string, { text: string; color: string }> = {
    'active': { text: 'Còn hiệu lực', color: 'green' },
    'expired': { text: 'Hết hiệu lực', color: 'red' },
    'amended': { text: 'Đã sửa đổi', color: 'yellow' },
  };
  return labels[status] || { text: status, color: 'gray' };
};

export const categories = [
  'Tất cả',
  'Đất đai',
  'Xây dựng',
  'Hộ tịch - Tư pháp',
  'Tư pháp',
  'Thuế - Tài chính',
  'Môi trường',
  'Lao động',
  'Doanh nghiệp',
  'Hành chính',
  'Khiếu nại - Tố cáo',
  'Hôn nhân - Gia đình',
  'Dân sự',
];

export const documentTypes = [
  { value: 'all', label: 'Tất cả loại' },
  { value: 'luat', label: 'Luật' },
  { value: 'nghi-dinh', label: 'Nghị định' },
  { value: 'thong-tu', label: 'Thông tư' },
  { value: 'quyet-dinh', label: 'Quyết định' },
  { value: 'nghi-quyet', label: 'Nghị quyết' },
];

export const getDocumentById = (id: string): LegalDocument | undefined => {
  return legalDocuments.find(doc => doc.id === id);
};

export const getDocumentsByCategory = (category: string): LegalDocument[] => {
  if (category === 'Tất cả') return legalDocuments;
  return legalDocuments.filter(doc => doc.category === category);
};

export const searchDocuments = (query: string): LegalDocument[] => {
  const normalizedQuery = query.toLowerCase();
  return legalDocuments.filter(doc =>
    doc.title.toLowerCase().includes(normalizedQuery) ||
    doc.number.toLowerCase().includes(normalizedQuery) ||
    doc.keywords.some(k => k.toLowerCase().includes(normalizedQuery)) ||
    doc.summary.toLowerCase().includes(normalizedQuery)
  );
};
