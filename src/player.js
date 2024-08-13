//player.js

import { k } from "./kaboomCTX";
import { scaleFactor } from "./constant";

// Function to set up the player character
export function setupPlayer(map) {
  const player = k.make([
    // Load the player's sprite and set the initial animation to "idle-down"
    k.sprite("spritesheet", { anim: "idle-down" }),

    // Define the collision area for the player with a small rectangle shape
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 6, 6),
    }),

    // Add physics to the player to allow movement and collision detection
    k.body(),

    // Set the anchor point to the center of the sprite
    k.anchor("center"),

    // Set the initial position of the player (can be updated later)
    k.pos(),

    // Scale the player sprite based on the predefined scale factor
    k.scale(scaleFactor),

    // Custom properties for the player
    {
      speed: 250,          // Movement speed of the player
      direction: "down",   // Initial direction the player is facing
      isInDialogue: false, // Flag to indicate if the player is in a dialogue
    },

    // Add a tag to identify this object as the player
    "player", 
  ]);

  // Return the player object for further use in the game
  return player;
}

