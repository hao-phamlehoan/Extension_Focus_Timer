const site = window.location.hostname;

const Add_Custom_Style = (css) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);

function Create_Custom_Element(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.querySelector("html").append(custom_element);
}

let site_list = [];

chrome.storage.sync.get(["webs"], (res) => {
  site_list = res.webs ? res.webs : []
})

chrome.storage.local.get(["isRunning"], (res) => {
  if (res.isRunning) {
    if (site_list.some(e => {
      return (site.search(e) != -1 ? true : false) 
    })) {
      document.querySelector("html").innerHTML = "";

      Add_Custom_Style(`
            * {
                user-select: none !important;
                pointer-events: none !important;
            }
    
            html {
                background-image: linear-gradient(to left, #92ffc0 10%, #002661 100%) !important;
            }
    
            #access-denied {
                display: block !important;
                color: #fff;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 80px;
                font-weight: bold;
                z-index: 9999999999;
            }
        `);

      Create_Custom_Element(
        "div",
        "id",
        "access-denied",
        `<img src="https://scontent.fhan3-5.fna.fbcdn.net/v/t1.15752-9/320743052_687846082812379_5372573030674270913_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Z8zwhUBhax8AX9ytiC-&_nc_ht=scontent.fhan3-5.fna&oh=03_AdRC1lzLnQcbSx8QJkEvgAV7s8-Vs-aKExV05q2CtFOZJQ&oe=63D61F1C" alt="HỌC BÀI ĐI">`
      );
    }
  }
});
