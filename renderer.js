const syncBtn = document.getElementById("syncNowBtn");

syncBtn.addEventListener("click", () => {
  window.api.startSync();
});

window.api.onProgress(({ compared, updated }) => {
  document.getElementById("filesCompared").innerText = compared;
  document.getElementById("filesUpdated").innerText = updated;
});
