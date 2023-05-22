module.exports = {
  plugins: ["commitlint-plugin-jira-rules"],
  extends: ["jira"],
  rules: {
    "jira-task-id-project-key": [2, "always", ["EW"]],
    "header-full-stop": [2, "always", "."],
  },
};
