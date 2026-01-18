// World: Compare Two AI Models
// Author: Anubhav Shakya and Khusbhoo Kumari

// Groq API endpoint & models
const groqURL = "https://api.groq.com/openai/v1/chat/completions";  // groq api
const model1 = "llama-3.3-70b-versatile";  // model 1
const model2 = "qwen/qwen3-32b";  // model 2

let apiKey = ""; 

// --- Basic styling ---
$("body").css("margin", "30px");
$("body").css("font-family", "Arial, sans-serif");

// --- Page structure ---
document.write(`
  <h2>Compare Two AI Models on Logical Reasoning</h2>
  <p>This world compares <b>llama-3.3-70b-versatile</b> and <b>qwen3-32b</b> using the <a href="https://console.groq.com" target="_blank">Groq API</a>.</p>

  <div style="margin-bottom:20px;">
    <h3>Step 1: Enter Groq API Key</h3>
    <input id="apikey" type="text" style="width:50vw;" placeholder="Enter your Groq API key (starts with gsk_)" />
    <button onclick="setKey();" class="ab-normbutton">Set Key</button>
    <p id="keyStatus"></p>
  </div>

  <div style="margin-bottom:20px;">
    <h3>Step 2: Enter Your Question</h3>
    <textarea id="userQuestion" rows="3" style="width:60vw;" placeholder="Type your question here..."></textarea>
    <br><br>
    <button onclick="runComparison();" class="ab-normbutton">Get Answers from Both Models</button>
  </div>

  <div id="results" style="background:#f9f9f9; padding:20px; border-radius:10px; border:1px solid #ccc;"></div>
`);

// --- Set API key ---
function setKey() {
  apiKey = $("#apikey").val().trim();
  if (apiKey.startsWith("gsk_")) {
    $("#keyStatus").html("<b style='color:green;'>API key set successfully!</b>");
  } else {
    $("#keyStatus").html("<b style='color:red;'>Invalid key. It should start with gsk_</b>");
  }
}

// --- Format the API response ---
function formatResponse(text) {
  if (!text) return "No response.";

  // Remove real <think> ... </think> blocks from Groq reasoning models
  text = text.replace(/<\s*think[^>]*>[\s\S]*?<\s*\/\s*think\s*>/gi, "");

  // Remove escaped &lt;think&gt; ... &lt;/think&gt; blocks if HTML-escaped
  text = text.replace(/&lt;\s*think[^&]*&gt;[\s\S]*?&lt;\s*\/\s*think\s*&gt;/gi, "");

  text = text.trim();

  // Escape HTML AFTER removing think blocks
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Markdown formatting
  text = text.replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");
  text = text.replace(/^### (.*$)/gim, "<h4>$1</h4>");
  text = text.replace(/^## (.*$)/gim, "<h3>$1</h3>");
  text = text.replace(/^# (.*$)/gim, "<h2>$1</h2>");
  text = text.replace(/\n/g, "<br>");

  return text;
}

// --- Call Groq API ---
async function callGroq(model, prompt) {
  try {
    const response = await fetch(groqURL, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    if (data.error) return "Error: " + data.error.message;

    return data.choices?.[0]?.message?.content.trim() || "No response.";
  } catch (err) {
    return "Error calling API (" + model + ")";
  }
}

// --- Compare ---
async function runComparison() {
  if (!apiKey) {
    alert("Please enter your Groq API key first!");
    return;
  }

  const question = $("#userQuestion").val().trim();
  if (!question) {
    alert("Please enter a question!");
    return;
  }

  $("#results").html("<i>Getting responses... please wait...</i>");

  const [ans1, ans2] = await Promise.all([
    callGroq(model1, question),
    callGroq(model2, question)
  ]);

  $("#results").html(`
    <h3>Question:</h3>
    <div style="white-space:pre-wrap; background:#eef; padding:10px; border-radius:5px;">
      ${question}
    </div>
    <hr>

    <div style="margin-bottom:20px;">
      <h4 style="color:#2a5;">Llama 3.3 70B Versatile</h4>
      <div style="background:#fff; border:1px solid #ccc; padding:15px; border-radius:8px; line-height:1.5;">
        ${formatResponse(ans1)}
      </div>
    </div>

    <div>
      <h4 style="color:#25a;">Qwen3 32B</h4>
      <div style="background:#fff; border:1px solid #ccc; padding:15px; border-radius:8px; line-height:1.5;">
        ${formatResponse(ans2)}
      </div>
    </div>
  `);
}
