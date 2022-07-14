//Selección de los elementos del html
const d = document
$table = d.querySelector(".crud-table")
$form = d.querySelector(".crud-form")
$title = d.querySelector("crud.title")
$template = d.getElementById("crud-template").content
$fragment = d.createDocumentFragment()

//Se muestra la tabla y a través de fetch traemos los datos de los santos
const getAll = async () => {
    try {
      let res = await fetch("http://localhost:3000/santos")
        json = await res.json()

      if (!res.ok) throw { status: res.status, statusText: res.statusText }

      json.forEach(el => {
        $template.querySelector(".name").textContent = el.nombre
        $template.querySelector(".constellation").textContent = el.constelacion
        $template.querySelector(".edit").dataset.id = el.id
        $template.querySelector(".edit").dataset.name = el.nombre
        $template.querySelector(".edit").dataset.constellation = el.constelacion
        $template.querySelector(".delete").dataset.id = el.id

        let $clone = d.importNode($template, true)
        $fragment.appendChild($clone)
      })

      $table.querySelector("tbody").appendChild($fragment)
    } catch (err) {
      let message = err.statusText || "Ocurrió un error"
      $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`)
    }
  }
d.addEventListener("DOMContentLoaded", getAll)

//A través del método POST creamos un nuevo santo
d.addEventListener("submit", async e => {

    if (e.target === $form) {
      e.preventDefault()

    if (!e.target.id.value) {

        try {
        let options = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            nombre: e.target.name.value,
            constelacion: e.target.constellation.value }) }

        res = await fetch("http://localhost:3000/santos", options)
        json = await res.json()

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        location.reload()

        } catch (err) {
          let message = err.statusText || "Ocurrió un error"
          $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`)
        } } } } )