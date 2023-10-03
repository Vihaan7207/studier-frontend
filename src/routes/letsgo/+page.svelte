<script lang='ts'>
    import { onMount } from "svelte";

    onMount((): void => {
        let loggedIn = localStorage.getItem('studier:loggedIn');
        console.log(loggedIn);
        
        if (loggedIn === null) {
            localStorage.setItem('studier:loggedIn', 'false');
        }

        loggedIn = JSON.parse(localStorage.getItem('studier:loggedIn') as string);

        if (loggedIn) {
            window.location.href = '/home';
        }

        else {
            window.location.href = '/login';
        }
        
    });
</script>