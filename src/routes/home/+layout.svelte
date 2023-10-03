<script lang='ts'>
    import { loggedInUser } from "../../stores";
    import type { Student } from "../../interfaces";
	import { onMount } from "svelte";

    onMount(() => {

        let loggedInUserObject: Student;
        
        const unsubscribe = loggedInUser.subscribe((value) => {
            // console.log(value);
            
            loggedInUserObject = value;
        });
        
        console.log(loggedInUserObject);
        
        
        let loggedInArray: Array<string>;
    })
</script>

<nav>
    <h1>Studier</h1>
    <div id="small">
        <p>About</p>
        <p>Vihaan M</p>
    </div>
</nav>

<slot/>

<style lang='scss'>
    nav {
        width: 100vw;
        height: 10vh;
        padding: 0;
        background-color: $blue-color;
        display: flex;
        align-items: center;
        font-family: 'Lexend';
        color: white;

        h1 {
            font-size: 5vh;
            margin-left: 20px;
            
        }

        #small {
            margin-left: 70vw;
            width: 12vw;
            display: flex;
            justify-content: space-between;
            font-size: 1vw * 1.2;
        }

        @media only screen and ( max-width: 596px ) {
            h1 {
                font-size: 7.5vw;
            }

            #small {
                margin-left: 35vw;
                width: 17vw;
                font-size: 1.6vw * 1.2;
            }
        }
    }
</style>