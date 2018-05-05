import "../css/style.scss"

function component() {
    const element = document.createElement("h1")
    const spanTitle = document.createElement("span")
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = "Hello webpack"
    spanTitle.className = "title"
    spanTitle.innerHTML = "spantitle"
    element.appendChild(spanTitle)
    return element
}

document.body.appendChild(component())
