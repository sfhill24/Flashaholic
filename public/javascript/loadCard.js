async function loadCard(event) {
    console.log(">>ONLOAD FUNCTION>>");

    if(isAuthenticated){
        const response = await fetch('/api/users', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    }

    if (!response.ok) {
        alert(response.statusText);
      }
}

document
  .addEventListener("load", loadCard);

