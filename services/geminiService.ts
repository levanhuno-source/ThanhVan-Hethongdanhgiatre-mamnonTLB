
import { GoogleGenAI } from "@google/genai";
import { AssessmentRecord, AssessmentTarget, AssessmentStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSmartSummary(
  studentName: string, 
  records: AssessmentRecord[], 
  targets: AssessmentTarget[]
): Promise<string> {
  try {
    const assessmentDetails = records.map(r => {
      const target = targets.find(t => t.id === r.targetId);
      return `- ${target?.content}: ${r.status}${r.note ? ` (Ghi chú: ${r.note})` : ''}`;
    }).join('\n');

    const prompt = `Bạn là một giáo viên mầm non Việt Nam giàu kinh nghiệm, am hiểu Thông tư 51/2020/TT-BGDĐT. 
    Dựa trên kết quả đánh giá thực tế của trẻ dưới đây, hãy viết một đoạn nhận xét chuyên môn (3-4 câu) ngắn gọn, súc tích và mang tính chất khuyến khích. 
    Nhận xét cần chỉ rõ ưu điểm nổi bật và những mặt trẻ cần rèn luyện thêm dựa trên "Kết quả mong đợi" của chương trình GDMN.

    Học sinh: ${studentName}
    Kết quả đánh giá chi tiết:
    ${assessmentDetails}
    
    Yêu cầu: Văn phong sư phạm, thân thiện với phụ huynh, đúng thuật ngữ giáo dục Việt Nam.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Đã ghi nhận kết quả đánh giá cho trẻ.";
  } catch (error) {
    console.error("Gemini summary error:", error);
    return "Đã hoàn thành đánh giá định kỳ cho học sinh.";
  }
}
