<script lang='ts'>
    import { title } from "../stores";

</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css?family=Lexend:100,200,300,regular,500,600,700,800,900" rel="stylesheet" />
    <title>Studier | { $title }</title>
</svelte:head>

<slot />

<style lang="scss">
    :global {
        @import '../style/app.scss';
    }
</style>