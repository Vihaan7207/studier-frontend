<script lang='ts'>
    import { loggedInUser, title } from "../../stores";
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    onMount(() => {
        title.set('Home');
        if ($loggedInUser.name == "") {
            goto('/login');
        }
    })
</script>
<h1>Welcome, { $loggedInUser.name }!</h1>
