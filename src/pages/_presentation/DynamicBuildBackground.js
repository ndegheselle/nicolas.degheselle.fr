let resizeObserver = null;

function setPreviewOn(target) {
  const buildPreviewElement = document.getElementById("buildPreview");
  target.classList.add("building-element");
  buildPreviewElement.classList.remove("d-none");
  // Handle resize
  resizeObserver = new ResizeObserver((entries) => {
    const targetRect = entries[0].target.getBoundingClientRect();
    const widthElement = buildPreviewElement.querySelector(".width");
    const heightElement = buildPreviewElement.querySelector(".height");

    widthElement.style.width = `${targetRect.width + 1}px`;
    widthElement.style.left = `${targetRect.left - 1}px`;
    heightElement.style.height = `${targetRect.height + 1}px`;
    heightElement.style.top = `${targetRect.top - 1}px`;
  });

  resizeObserver.observe(target);
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
    const elementName = line.replace("}", "").replace("{", "").trim().split(" ")[0];
    setupBackgroundPreview(elementName);
  }

  container.innerHTML = newCss.join("\n") + "}";
  return true;
}

function setupBackgroundPreview(elementName) {
  const element = document.querySelector(elementName);
  if (!element) return;
  cleanBackgroundPreview();
  setPreviewOn(element);
}

function cleanBackgroundPreview()
{
  const elements = document.querySelectorAll(".building-element");
  elements.forEach((element) => element.classList.remove("building-element"));
  // clean resize observer
  if (resizeObserver) resizeObserver.disconnect();
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
  var intervalId = window.setInterval(function () {
    const haveBuildRemaining = buildStyle(idCssToBuild, idCssContainer);
    if (!haveBuildRemaining) {
      clearInterval(intervalId);
      cleanBackgroundPreview();
      hidePreview();
    }
  }, 1000);
}
