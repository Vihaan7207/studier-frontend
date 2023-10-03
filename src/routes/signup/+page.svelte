<script lang='ts'>
    import { onMount } from "svelte";
	import { title } from "../../stores";
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faEye, faEyeSlash, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
    import client from "../../apollo/client";
    import { setClient, mutation } from "svelte-apollo";
    import { CREATE_USER } from "../../apollo/queries";
    let usernameInput: HTMLInputElement;
    let nameInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let verifyPasswordInput: HTMLInputElement;
    let inputs: Array<HTMLInputElement>;
    let warningMessage: HTMLParagraphElement;
    let emptyValue: HTMLSpanElement;

    let showPassword: boolean = false;

    setClient(client);
    const signUpMutation = mutation(CREATE_USER);

    onMount((): void => {
        usernameInput = document.getElementById('username')! as HTMLInputElement;
        nameInput = document.getElementById('name')! as HTMLInputElement;
        passwordInput = document.getElementById('password')! as HTMLInputElement;
        verifyPasswordInput = document.getElementById('verify-password')! as HTMLInputElement;
        warningMessage = document.getElementById('warning')! as HTMLParagraphElement;
        emptyValue = document.getElementById('empty-value')! as HTMLSpanElement;
        inputs = [ usernameInput, nameInput, passwordInput, verifyPasswordInput ];


        title.set('Sign Up')
    });


    const inputHandler = (): void => {
        undoFX();
    };

    const turnRed = (input: HTMLInputElement): void => {
        input.style.borderColor = 'rgb(186, 19, 19)';
        switch (input.placeholder) {
            case 'Username':
                emptyValue.innerHTML = 'username';
                break;
            case 'Full Name':
                emptyValue.innerHTML = 'name';
                break;
            case 'Password':
                emptyValue.innerHTML = 'password';
                break;
            case 'Verify Password':
                emptyValue.innerHTML = 'password a second time';
                break;
            default:
                alert('There was an error');
                break;
        }
        warningMessage.style.display = 'block';
        inputs.forEach((input: HTMLInputElement) => {
            input.addEventListener('input', inputHandler);
        });
    }

    const undoFX = (): void => {
        inputs.forEach((input: HTMLInputElement) => {
            input.removeEventListener('input', inputHandler);
            input.style.borderColor = 'black';
            console.log('change');
            
            input.addEventListener('select', (): void => {
                console.log('select');
                
                input.style.borderColor = '#2290E7';
            });
        });
        warningMessage.style.display = 'none';
    }

    const signUp = async (): Promise<void> => {
        inputs.every((input: HTMLInputElement) => {
            if (input.value === '') {
                turnRed(input);
                return false;
            }
            else {
                return true;
            }  
        });
        if (passwordInput.value !== verifyPasswordInput.value) {
            emptyValue.innerHTML = 'correct password a second time in the verify password field';
            warningMessage.style.display = 'block';
        }
        else {
            console.log('mutating');
            
            signUpMutation({
                variables: { username: usernameInput.value, name: nameInput.value, password: passwordInput.value }
            });
        }        
    }

    const handleSignUpKeyPress = (e: KeyboardEvent): void => {
        if (e.key === 'enter' || e.key === ' ') {
            signUp();
        }
    }


    const changeStatus = (): void => {
        showPassword = !showPassword;
        const showContainer = document.querySelector<HTMLSpanElement>('#showcontainer')!;
        if(showPassword) {
            document.querySelector<HTMLInputElement>('#password')!.type = 'text';
            document.querySelector<HTMLInputElement>('#verify-password')!.type = 'text';
        }
        else {
            document.querySelector<HTMLInputElement>('#password')!.type = 'password';
            document.querySelector<HTMLInputElement>('#verify-password')!.type = 'password';
        }
    }

    const handleChangeStatusKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      changeStatus();
    }
  };
    
    
</script>

<main>
    <h1>Sign Up</h1>
    <p id='warning'><Fa icon={faCircleExclamation} />     Please enter your <span id='empty-value'></span>     <Fa icon={faCircleExclamation} /></p>
    <input type="text" placeholder="Username" id='username' />
    <input type="text" placeholder="Full Name" id='name' />
    <br>
    <div class='password-container'>
        <input type='password' placeholder="Password" class='password' id='password'/>
        <span
            on:click={changeStatus}
            on:keypress={handleChangeStatusKeyPress}
            tabindex="0" 
            role="button" 
            id='showcontainer'
        >
            <Fa icon={showPassword ? faEyeSlash : faEye} style='cursor: pointer' id='show' />
        </span>
    </div>
    <div class='password-container'>
        <input type='password' placeholder="Verify Password" class='password' id='verify-password'/>
        <span
            on:click={changeStatus}
            on:keypress={handleChangeStatusKeyPress}
            tabindex="0" 
            role="button" 
            id='showcontainer'
        >
            <Fa icon={showPassword ? faEyeSlash : faEye} style='cursor: pointer' id='show' />
        </span>
    </div>
    <div 
        on:click={signUp}
        on:keypress={handleSignUpKeyPress}
        tabindex='0'
        class='button' 
        id='button'
        role='button'
    >Sign Up</div>
    <p>Already have an account? <a href="/login">Log In.</a></p>
</main>

<style lang='scss'>
    main {
        // border: solid;
        width: 600px;
        height: 400px;
        text-align: center;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        font-family: $application-font;

        input {
            font-family: $application-font;
            height: 50px;
            font-size: 20px;
            text-align: center;
            border-radius: 14px;
            outline: none;
            border: solid;
            margin-top: 20px;
            margin-bottom: 20px;
            
            
            &:focus {
                border-color: $blue-color;
            }
        }
        
        #username, #name {
            width: 375px;
        }

        .password {
            width: 320px;
        }

        #button {
            width: 350px;
            transform: translate(-50%, 0);
            margin-left: 50%;
        }

        a {
            text-decoration: none;
            color: $blue-color;
            transition: 0.3s;

            &:hover {
                color: darken($blue-color, 10%);
            }
        }

        .password-container {
            font-size: 35px;
        }

        #warning {
            color: rgb(186, 19, 19);
            display: none;
        }
    }
</style>
