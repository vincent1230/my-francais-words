async function loadTranscript() {
  try {
    const response = await fetch("transcript1.txt");
    if (!response.ok) {
      throw new Error("文件加载失败");
    }
    const text = await response.text();

    // 处理文本
    const processedText = text
      .split("\n")
      .map((line) => {
        // 检查是否是时间标记（匹配 "0:00"、"00:00" 或 "1:00:13" 格式）
        if (/^\d{1,2}(:\d{2}){1,2}$/.test(line.trim())) {
          // 将时间标记包装在 time 标签中
          return `<time>${line.trim()}</time>`;
        }
        return line;
      })
      .join("\n");

    // 将文本按段落分割并创建 HTML
    const paragraphs = processedText
      .split("\n")
      .filter((p) => p.trim())
      .map((p) => `<p>${p.trim()}</p>`)
      .join("");

    document.getElementById("transcript-content").innerHTML = paragraphs;
  } catch (error) {
    document.getElementById(
      "transcript-content"
    ).innerHTML = `<p class="error">加载文字稿时出错: ${error.message}</p>`;
  }
}

// 页面加载时执行
document.addEventListener("DOMContentLoaded", loadTranscript);
