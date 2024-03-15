const setAttributes = (fd, elm) => {
    fd.Placeholder && elm.setAttribute("placeholder", fd.Placeholder);
    fd.Value && elm.setAttribute("value", fd.Value);
    fd.Mandatory && elm.setAttribute("mandatory", fd.Mandatory);
    fd.ID && elm.setAttribute("id", fd.ID);
};

const createWrapper = (fd, elm) => {
    let wrapper = document.createElement("div");

    fd.Name != ""? wrapper.classList.add(fd.Name + "__wrapper") : ""; 

    elm? wrapper.appendChild(elm) : "";

    return wrapper;
}

const createInput = () => {
    
};

const createHeading = (fd, form) => {
    let heading = document.createElement("h3");
    heading.innerText = fd.Label;
    setAttributes(fd, heading);
    let em = createWrapper(fd, heading);

    return em;
};

const createPlainText = (fd, form) => {
    let text = document.createElement("p");
    text.innerText = fd.Label;
    setAttributes(fd, text);
    let em = createWrapper(fd, text);

    return em;
};


const createRadio = (fd, form) => {
    let radioWrapper = createWrapper(fd, null);

    fd.Options.split(",").map(t => {
        let ipWrap = document.createElement("div");
        let ip = document.createElement("input");
        let ipLabel = document.createElement("label");

        ipWrap.classList.add("radio__wrap");
        ipLabel.innerText = t.trim();

        ip.setAttribute("name", "select-reason");
        ip.setAttribute("value", t.trim());
        ip.setAttribute("id", "cr-" + t.trim().toLowerCase().replace(" ", "-"));
        ipLabel.setAttribute("for", "cr-" + t.trim().toLowerCase().replace(" ", "-"));

        ipWrap.appendChild(ip);
        ipWrap.appendChild(ipLabel);
        ip.setAttribute("type", "radio");
        radioWrapper.appendChild(ipWrap);
    });

    return radioWrapper;
};

const createSelect = (fd, form) => {
    let selectWrapper = createWrapper(fd, null);
};

const CORE_FEILDS = {
    heading: createHeading,
    plaintext: createPlainText,
    radio: createRadio,
    select: createSelect,
}

export default async function createField(fd, form) {
    console.log(fd);
    let createElement = CORE_FEILDS[fd.Type] || createInput;
    let element = createElement(fd, form);

    return element;
}