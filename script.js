const chatIcon = document.getElementById("chatbot-icon");
const chatBox = document.getElementById("chatbox");
const messages = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// 🔹 إظهار أو إخفاء نافذة المساعد عند الضغط على الأيقونة
chatIcon.onclick = () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
};

// 🔹 إرسال السؤال إلى GPT عند الضغط على "إرسال"
sendBtn.onclick = async () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("أنت", text);
  userInput.value = "";

  addMessage("المساعد", "جارٍ التفكير بالإجابة... 🤔");

  const apiKey = "YOUR_API_KEY_HERE"; // ← ضع هنا مفتاح OpenAI الخاص بك

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "أنت مساعد ذكي متخصص في علم الأحياء، تشرح المفاهيم البيولوجية بلغة واضحة ومبسطة للطلاب." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    messages.lastChild.textContent = "المساعد: " + data.choices[0].message.content;
  } catch (error) {
    messages.lastChild.textContent = "حدث خطأ أثناء الاتصال بالمساعد 😢";
  }
};

// 🔹 عرض الرسائل داخل نافذة المحادثة
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}
