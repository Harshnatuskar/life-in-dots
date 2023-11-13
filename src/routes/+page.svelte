<script lang="ts">
    import { emptyCircles } from './circles';
    import { onMount } from 'svelte';

    let age = '';
    const numOfRowsAndColumns = 10;
    const circles = emptyCircles(numOfRowsAndColumns);

    // Function to handle form submission
    function handleSubmit() {
        // Clear previous values
        circles.forEach((circle) => {
            circle.filled = false;
            circle.flicker = false;
        });

        // Update circles based on the new age value
        if (parseInt(age) > 0 && parseInt(age) <= 100) {
            circles.forEach((circle, index) => {
                circle.filled = index < parseInt(age);

                // Flicker only the last filled circle
                if (circle.filled && index === parseInt(age) - 1) {
                    circle.flicker = true;
                    setTimeout(() => {
                        circle.flicker = false;
                    }, 2);
                }
            });
        }

        // Clear the flicker interval for the previous age value
        clearInterval(flickerInterval);

        // Start a new interval for flickering
        flickerInterval = setInterval(() => {
            circles[parseInt(age) - 1].flicker = !circles[parseInt(age) - 1].flicker;
        }, 500); 

        
    }

    function handleKeyPress(event:KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
    }

    // Interval ID for flickering
    let flickerInterval: NodeJS.Timeout;

    // Cleanup interval on component destruction
    onMount(() => {
        return () => clearInterval(flickerInterval);
    });
</script>

<div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-lg text-white font-small pt-1.5">Life in dots</h1>
        <input bind:value={age} on:keydown={handleKeyPress} class="bg-gray-800 border-current text-white p-1 mt-4 rounded-sm hover:white" type="number" placeholder="Enter your age"/>
        <button on:click={handleSubmit} class="bg-gray-800 text-white mt-4 p-1 rounded-sm ring-rose-500 hover:ring-2">Submit</button>
        <div class="grid grid-cols-10 gap-1 items-center mt-10">
            {#each circles as { id, filled, flicker } (id)}
                <div class={`w-5 h-5 ${filled ? 'bg-white' : 'bg-transparent'} border border-white rounded-full ${flicker ? 'animate-ping' : ''}`}></div>
            {/each}
        </div>
    </div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: black;
    }

    @keyframes flicker {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
</style>
