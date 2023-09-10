let currentTarget = null;

function resizePreviewLineOn(target) {
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

function addCssCodingToBackground(line) {
  const container = document.getElementById("codingCss");
  const span = document.createElement("span");

  if (line.includes(";")) {
    span.classList.add("ml-4");
  }
  span.innerHTML = line;
  container.append(span);
}

function updateBackground(timeStamp) {
  if(!currentTarget) return;

  resizePreviewLineOn(currentTarget);
  window.requestAnimationFrame(updateBackground);
}

function setupBackgroundPreviewLine(elementName) {
  const element = document.querySelector(elementName);
  if (!element) return;
  currentTarget = element;
  window.requestAnimationFrame(updateBackground);
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

  if (line.includes("{")) {
    const elementName = line.replace("}", "").replace("{", "").trim();
    setupBackgroundPreviewLine(elementName);
  }

  addCssCodingToBackground(line);

  container.innerHTML = newCss.join("\n") + "}";
  return true;
}

export function animateBuild(idCssToBuild, idCssContainer) {
  var intervalId = window.setInterval(function () {
    const haveBuildRemaining = buildStyle(idCssToBuild, idCssContainer);
    if (!haveBuildRemaining) {
      clearInterval(intervalId);
      hidePreview();
    }
  }, 500);
}
