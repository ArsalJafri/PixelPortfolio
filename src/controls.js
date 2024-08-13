// controls.js

import { k } from "./kaboomCTX";
import { dialogueData } from "./constant";

// Function to handle player movement and animation based on key presses
function handleKeyControls(player) {
  function stopAnims() {
    if (player.direction === "down") {
      player.play("idle-down");
    } else if (player.direction === "up") {
      player.play("idle-up");
    } else {
      player.play("idle-side");
    }
  }

  k.onMouseRelease(stopAnims);
  k.onKeyRelease(stopAnims);
 
  k.onKeyDown((key) => {
    if (player.isInDialogue) return; // Prevent movement if in dialogue

    const keyMap = {
      right: k.isKeyDown("right"),
      left: k.isKeyDown("left"),
      up: k.isKeyDown("up"),
      down: k.isKeyDown("down"),
    };

    // Count the number of keys pressed
    const nbOfKeyPressed = Object.values(keyMap).filter(Boolean).length;

    // Only process single key movements
    if (nbOfKeyPressed > 1) return;

    if (keyMap.right) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
    } else if (keyMap.left) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
    } else if (keyMap.up) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.direction = "up";
      player.move(0, -player.speed);
    } else if (keyMap.down) {
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.direction = "down";
      player.move(0, player.speed);
    } else {
      stopAnims();
    }
  });
}

// Function to handle player movement and animation based on mouse input
export function setupControls(player) {
  // Handle mouse movement
  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);
    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() !== "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
    } else if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() !== "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
    } else if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
    } else if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
    }
  });

  // Initialize key controls handling
  handleKeyControls(player);
}



  
  



