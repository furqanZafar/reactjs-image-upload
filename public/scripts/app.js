var React = require("react"),
    request = require("superagent");

var App = React.createClass({

    render: function(){
        return React.DOM.form({onSubmit: this.onSubmit}, 
            React.DOM.input({type:"file", name:"image-file", onChange: this.onFileSelect}),
            React.DOM.input({type:"submit", name:"submit"})
        );
    },

    getInitialState: function(){
        return {};
    },

    onFileSelect: function(e){
        this.setState({image: e.target.files[0]});
    },

    onSubmit: function(e){        
        request.put("/upload")    
            .attach("image-file", this.state.image, this.state.image.name)
            .end(function(res){
                console.log(res);
            });
        e.preventDefault();
    }

});

React.render(App({}), document.body);