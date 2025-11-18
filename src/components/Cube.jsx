import { useEffect, useRef } from 'react'

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Erro ao compilar shader:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Erro ao linkar programa:', gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function createPerspectiveMatrix(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
  ];
}

function createRotationMatrix(angleX, angleY) {
  const cx = Math.cos(angleX);
  const sx = Math.sin(angleX);
  const cy = Math.cos(angleY);
  const sy = Math.sin(angleY);
  const scale = 1.2; // Aumento de 20%
  return [
    cy * scale, 0, sy * scale, 0,
    sx * sy * scale, cx * scale, -sx * cy * scale, 0,
    -cx * sy * scale, sx * scale, cx * cy * scale, 0,
    0, 0, 0, 1
  ];
}

function createQuestionMarkTexture(gl) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 256, 256);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 180px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', 128, 128);
  
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  
  return texture;
}

function initWebGL(canvas) {
  if (!canvas) {
    console.error("Canvas não encontrado.");
    return null;
  }

  const gl = canvas.getContext("webgl", { alpha: true });

  if (!gl) {
    console.error("WebGL não suportado.");
    return null;
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying vec2 vTextureCoord;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
      vTextureCoord = aTextureCoord;
    }
  `;

  const fsSource = `
    precision mediump float;
    uniform vec3 uColor;
    uniform float uAlpha;
    uniform sampler2D uTexture;
    varying vec2 vTextureCoord;
    void main() {
      vec4 texColor = texture2D(uTexture, vTextureCoord);
      vec4 color = vec4(uColor, uAlpha);
      float alpha = step(0.5, texColor.a);
      gl_FragColor = mix(color, vec4(texColor.rgb * uColor, uAlpha), alpha);
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  if (!shaderProgram) {
    console.error("Falha ao criar programa de shader.");
    return null;
  }

  const vertices = [
    -0.5, -0.5, -0.5,
     0.5, -0.5, -0.5,
     0.5,  0.5, -0.5,
    -0.5,  0.5, -0.5,
    -0.5, -0.5,  0.5,
     0.5, -0.5,  0.5,
     0.5,  0.5,  0.5,
    -0.5,  0.5,  0.5,
  ];

  const textureCoords = new Float32Array([
    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
    0.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
    0.0, 0.0,
  ]);

  const lineIndices = [
    0, 1, 1, 2, 2, 3, 3, 0,
    4, 5, 5, 6, 6, 7, 7, 4,
    0, 4, 1, 5, 2, 6, 3, 7,
  ];

  const faceIndices = [
    0, 1, 2,  0, 2, 3,
    4, 7, 6,  4, 6, 5,
    0, 4, 5,  0, 5, 1,
    2, 6, 7,  2, 7, 3,
    0, 3, 7,  0, 7, 4,
    1, 5, 6,  1, 6, 2,
  ];

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);

  const lineIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(lineIndices), gl.STATIC_DRAW);

  const faceIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faceIndices), gl.STATIC_DRAW);

  const texture = createQuestionMarkTexture(gl);

  const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  const textureCoord = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
  const modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
  const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
  const colorLocation = gl.getUniformLocation(shaderProgram, 'uColor');
  const alphaLocation = gl.getUniformLocation(shaderProgram, 'uAlpha');
  const textureLocation = gl.getUniformLocation(shaderProgram, 'uTexture');

  if (vertexPosition === -1) {
    console.error("Atributo aVertexPosition não encontrado.");
    return null;
  }

  const aspect = canvas.width / canvas.height;
  const projectionMatrix = createPerspectiveMatrix(Math.PI / 4, aspect, 0.1, 100.0);

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.enable(gl.DEPTH_TEST);

  let rotationX = 0.5;
  let rotationY = 0.5;
  let animationId = null;
  const whiteColor = [1.0, 1.0, 1.0];

  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    rotationX += 0.01;
    rotationY += 0.01;

    const modelViewMatrix = createRotationMatrix(rotationX, rotationY);
    modelViewMatrix[14] = -3.0;

    gl.useProgram(shaderProgram);

    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
    gl.uniform3fv(colorLocation, whiteColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.vertexAttribPointer(textureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(textureCoord);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(textureLocation, 0);

    gl.uniform1f(alphaLocation, 1.0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineIndexBuffer);
    gl.lineWidth(6.0);
    gl.drawElements(gl.LINES, lineIndices.length, gl.UNSIGNED_SHORT, 0);

    animationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }
  };
}

function Cube() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initWebGL(canvasRef.current);
      
      return () => {
        if (cleanup) {
          cleanup();
        }
      };
    }
  }, []);

  return (
    <canvas ref={canvasRef} id="glcanvas" width="800" height="600"></canvas>
  )
}

export default Cube

