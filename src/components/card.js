export default function Card(props) {
    const colors = ["primary","secondary", "success", "danger", "warning", "info", "light", "dark"];
    const randomColor = Math.floor(Math.random() * 8);
    return (
        <div className = {`text-center card text-bg-${colors[randomColor]} my-2 position-relative start-50 translate-middle-x`} style = {{ width: "80%", maxWidth: "80%"}}>
            <div className = "card-header">{props.title}</div>
            <div className = "card-body">
                <p className = "card-text" id = "cardText">{props.text}</p>
            </div>
        </div>
    );
}