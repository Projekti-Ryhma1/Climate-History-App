

export default function PreferencesInputGroup(props){
    return(
        <div class="div-centered">
            <div class="row my-5">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                    <label class="form-check-label" for="exampleRadios1">
                        Enable {props.setting}
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                    <label class="form-check-label" for="exampleRadios2">
                        Disable {props.setting}
                    </label>
                </div>
                <div>
                    <button onClick={consolePrint()}>Click me</button>
                </div>
            </div>
        </div>
    )
}

function consolePrint(){
    /* if($("#exampleRadios1").is(":checked")){
    console.log("Hello world I was selected right now")
    }
    else{
        console.warn("INPUT 1 IS NOT CHECKED")
    } */
}