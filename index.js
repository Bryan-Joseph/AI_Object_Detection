function sendData(count,image) {
    localStorage.setItem('item--Count',count);
    localStorage.setItem('item--Image',image);

    document.location.replace('items.html')
}