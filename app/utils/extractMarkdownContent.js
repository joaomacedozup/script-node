const extractMarkdownContent = (text) => {
  const regex = /```markdown([\s\S]*?)```/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1].trim());
  }

  return matches;
};
module.exports = { extractMarkdownContent };