<script lang='ts'>
    import { onMount } from "svelte";
    import { title, loggedInUser } from "../../stores";
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faEye, faEyeSlash, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
    import client from "../../apollo/client";
    import { setClient } from "svelte-apollo";
    import { GET_USER } from "../../apollo/queries";
    import { goto } from "$app/navigation";
    setClient(client);
    let showPassword: boolean = false;
    let usernameInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    onMount((): void => {
      usernameInput = document.querySelector<HTMLInputElement>('#username')!;
      passwordInput = document.querySelector<HTMLInputElement>('#password')!;
      usernameInput.addEventListener('input', (e): void => {
        undoFX();
      });
      passwordInput.addEventListener('input', (e): void => {
        undoFX();
      });
      title.set('Log In');
    });
        
    const changeStatus = () => {
      showPassword = !showPassword;
      const showContainer = document.querySelector<HTMLSpanElement>('#showcontainer')!;
      if (showPassword) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    }    
      
    const handlePasswordKeyPress = (event: KeyboardEvent): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        changeStatus();
      }
    };
      
    const handleLoginKeyPress = (event: KeyboardEvent): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        getUser();
      }
    };
    
    const turnRed = (): void => {
      usernameInput.style.borderColor = 'rgb(186, 19, 19)';
      passwordInput.style.borderColor = 'rgb(186, 19, 19)';
    }
    
    const wrongPass = (): void => {
        turnRed();
        document.querySelector<HTMLParagraphElement>('#wrongpass')!.style.display = 'block';
    }

    const undoFX = (): void => {
      usernameInput.style.borderColor = 'black';
      passwordInput.style.borderColor = 'black';
      document.querySelector<HTMLParagraphElement>('#wrongpass')!.style.display = 'none';
    }
      
    const getUser = async () => {
      const { data } = await client.query({
        query: GET_USER,
        variables: { username: usernameInput.value }
      });

      if (data.student) {
        if ( data.student.password === passwordInput.value ) {        
          loggedInUser.set(data.student);
          goto('/home');
        }
        else {
          console.log('bad pass');
          wrongPass();
        }
      }
      else {
        wrongPass();
      }
      
    }
  </script>
          
    <main>
    <h1>Login</h1>
    <p id='wrongpass'><Fa icon={faCircleExclamation}/>     Wrong username or password     <Fa icon={faCircleExclamation}/></p>
    <input type="text" placeholder="Username" id='username'>
    <br>
    <div id='password-container'>
      <input type='password' placeholder="Password" id='password'>
      <span
        on:click={changeStatus}
        on:keypress={handlePasswordKeyPress}
        tabindex="0"
        role="button"
        id='showcontainer'
      >
        <Fa icon={showPassword ? faEyeSlash : faEye} style='cursor: pointer' id='show' />
      </span>
    </div>
    <div
      class='button'
      id='button'
      on:click={getUser}
      on:keypress={handleLoginKeyPress}
    >Log In</div>
    <p>Don't have an account? <a href="/signup">Sign Up.</a></p>
  </main>
  
  <style lang='scss'>
    main {
      // border: solid;
      width: 30vw;
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
  
      #username {
        width: 375px;
      }
  
      #password {
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
  
      #password-container {
        font-size: 35px;
      }
      #wrongpass {
        color: rgb(186, 19, 19);
        display: none;
      }
    }
  </style>
  