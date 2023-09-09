let currentTarget = null;

function resizePreviewOn(target) {
  if (!target) return;
  
  const buildPreviewElement = document.getElementById("buildPreview");
  const targetRect = target.getBoundingClientRect();
  const widthElement = buildPreviewElement.querySelector(".width");
  const heightElement = buildPreviewElement.querySelector(".height");

  widthElement.style.width = `${targetRect.width + 1}px`;
  widthElement.style.left = `${targetRect.left - 1}px`;
  heightElement.style.height = `${targetRect.height + 1}px`;
  heightElement.style.top = `${targetRect.top - 1}px`;
}

function hidePreview() {
  const buildPreviewElement = document.getElementById("buildPreview");
  const widthElement = buildPreviewElement.querySelector(".width");
  const heightElement = buildPreviewElement.querySelector(".height");
  widthElement.setAttribute("style", "");
  heightElement.setAttribute("style", "");
}

function buildStyle(idCssToBuild, idCssContainer) {
  const template = document.getElementById(idCssToBuild);
  const container = document.getElementById(idCssContainer);

  const templateHTML = template.content.children[0].innerHTML.split("\n");

  const actualCss = container.innerHTML.split("\n").length;
  if (templateHTML.length <= actualCss) return false;

  const newCss = templateHTML.slice(0, actualCss + 1);
  const line = newCss[newCss.length - 1];
  addCssCoding(line);

  if (line.includes("{")) {
    const elementName = line.replace("}", "").replace("{", "").trim();
    setupBackgroundPreview(elementName);
  }

  container.innerHTML = newCss.join("\n") + "}";
  return true;
}

function setupBackgroundPreview(elementName) {
  const element = document.querySelector(elementName);
  if (!element) return;
  resizePreviewOn(element);
}

function addCssCoding(line) {
  const container = document.getElementById("codingCss");
  const span = document.createElement("span");

  if (line.includes(";")) {
    span.classList.add("ml-4");
  }
  span.innerHTML = line;
  container.append(span);
}

export function animateBuild(idCssToBuild, idCssContainer) {

  function resizeOnCurrent() {
    resizePreviewOn(currentTarget);
  }
  window.addEventListener('resize', resizeOnCurrent);
  var intervalId = window.setInterval(function () {
    const haveBuildRemaining = buildStyle(idCssToBuild, idCssContainer);
    if (!haveBuildRemaining) {
      clearInterval(intervalId);
      
      window.removeEventListener('resize', resizeOnCurrent);
      hidePreview();
    }
  }, 500);
}
