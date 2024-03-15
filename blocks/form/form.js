import createField from "./form-lib.js";

async function createForm(link) {
    const { pathname } = new URL(link);
    const resp = await fetch(pathname);
    const json = await resp.json();

    const form = document.createElement('form');
    form.dataset.action = pathname.split('.json')[0];

    const fields = await Promise.all(json.data.map(fd => createField(fd, form)));

    fields.forEach(field => {
        field? form.appendChild(field) : "";
    });

    return form;
}

export default async function decorate(block) {
    let link = block.querySelector("a").getAttribute("title");

    let form = await createForm(link);
    block.replaceChildren(form);
}