/**
 * @author: Artur Komoter
 */

exports.submitDocument = (route, body, redirectHandler) => {
    let url = 'http://localhost:3001' + route;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(redirectHandler)
        .catch(console.log);
};

exports.handleInputChange = function(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
};

exports.loadDocument = function(route) {
    let url = 'http://localhost:3001' + route;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState(data.result ? data.result : data);
        })
        .catch(console.log);
};