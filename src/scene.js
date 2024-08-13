//scene.js

import { k } from "./kaboomCTX";
import { dialogueData, scaleFactor } from "./constant";
import { setupPlayer } from "./player";
import { setupControls } from "./controls";
import { displayDialogue, setCamScale } from "./utils";

// Load the main character's spritesheet and define animations
k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 9 },
  },
});

// Load the map sprite and set the background color
k.loadSprite("map", "./map.png");
k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
  // Fetch and load map data from JSON file
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;

  // Create the map object and scale it
  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  // Setup the player character
  const player = setupPlayer(map);

  // Process map layers to add boundaries and spawn points
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        const isSofaTable = boundary.name === "sofa-table";
        map.add([
          // Add collision area for each boundary object
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }), // Make the boundary static (non-moving)
          k.pos(boundary.x, boundary.y), // Position the boundary on the map
          boundary.name,
        ]);

        if (boundary.name && !isSofaTable) {
          // If the boundary has a name and is not the "sofa-table", trigger dialogue on collision
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialogue(dialogueData[boundary.name], () => (player.isInDialogue = false));
          });
        } else if (isSofaTable) {
          // Treat "sofa-table" as a boundary without triggering dialogue
          player.onCollide(boundary.name, () => {});
        }
      }
    }

    if (layer.name === "spawnpoints") {
      // Set the player's initial position based on the spawn point
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player); // Add the player to the map
        }
      }
    }
  }

  // Set the initial camera scale and update it when the window is resized
  setCamScale(k);
  k.onResize(() => {
    setCamScale(k);
  });

  // Continuously update the camera position to follow the player
  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  // Setup controls for the player
  setupControls(player);
});

// Start the "main" scene
k.go("main");




