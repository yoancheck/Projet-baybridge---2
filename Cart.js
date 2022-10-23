var shoppingList;
var yourProduct = [];

(async () => {
    try {
        let data = await fetch('https://fakestoreapi.com/products')
        if (data.status = 200) {
            let dJson = await data.json()
            console.log(dJson)
            shoppingList = dJson;
            displayCart(dJson)
        } else {
            throw new Error("error code")
        }

    } catch (err) {
        console.log(err.message)
    }
})();

function displayCart(obj) {
    const tbo = document.getElementById("tbo")
    obj.forEach(element => {
        const tr = document.createElement('tr')
        tbo.appendChild(tr)
    });

    const allTr = document.getElementsByTagName('tr')

    for (let i = 0; i < allTr.length; i++) {
        const img = document.createElement('img')
        img.setAttribute("src", obj[i].image)
        img.setAttribute("width", "60px")
        img.setAttribute("heigth", "60px")

        const title = document.createTextNode(obj[i].title)

        const price = document.createTextNode(`${obj[i].price}$`)
        const quantity = document.createElement("input")

        quantity.addEventListener('change', doThing);
        quantity.id = i
        quantity.input = "number"
        quantity.max = 5
        quantity.min = 0
        quantity.value = 0

        const button = document.createElement('button')
        button.setAttribute("width", "100px")
        button.setAttribute("height", "100px")
        button.setAttribute("id", "delete")
        button.setAttribute("textContent", "test")

        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')

        td1.appendChild(img)
        td2.appendChild(title)
        td3.appendChild(quantity)
        td4.appendChild(price)

        allTr[i + 1].appendChild(td1)
        allTr[i + 1].appendChild(td2)
        allTr[i + 1].appendChild(td3)
        allTr[i + 1].appendChild(td4)
    }
}

function doThing(){
    document.getElementById("container").innerHTML = "";

    // it's not very performant, we should use a map to avoid o(n) performance issue here
    const duplicate = yourProduct.find((element) => element.title === shoppingList[this.id].title);
    if (!duplicate) {
        yourProduct.push({...shoppingList[this.id], numberOfProduct: this.value})
    }
    else {
        duplicate.numberOfProduct = this.value
        
    }
     
    var cont = document.getElementById('container');

    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (i = 0; i <= yourProduct.length - 1; i++) {
        var div = document.createElement('div')
        div.textContent = "Quantity : " +  yourProduct[i].numberOfProduct
        div.id = 'quantityCheckout'
        ul.appendChild(div);

        var li = document.createElement('li');  
        li.innerHTML = yourProduct[i].title
        li.setAttribute('style', 'display: block;');
        ul.appendChild(li);
    }

    cont.appendChild(ul);     
    var div = document.createElement('div'); 
    div.textContent = '-----------------------------'
    cont.appendChild(div);    
    var div = document.createElement('div'); 
    const sum = yourProduct.reduce((accumulator, object) => {
        return accumulator + object.price * object.numberOfProduct;
      }, 0);
    div.textContent = 'Total : ' + sum;
    cont.appendChild(div);
}
