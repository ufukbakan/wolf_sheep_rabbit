export default function (props) {

    return (
        <div className="choice" onClick={props.sendChoice.bind(this, props.value)}>
            <img src={props.img}></img>
        </div>
    )
}