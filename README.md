# Rubik's Cube API

## Requirements

Install Node.js and npm.

## Install and test

```powershell
npm ci
npm test
```

## Start the API

```powershell
npm start
```

The API is available at `http://localhost:3000`by default

## Enter moves

Within the second PowerShell paste the loop below. After that, you can input moves such as `R`, `Rw`, `U'`, or `F2`.
List of moves with their visual representation: https://jperm.net/3x3/moves 
(EXCLUDING!! Whole cube rotations [x, y, z], since that is a little bit useless here because the output JSON shows all faces at once)
`q` to quit.

```powershell
$api = "http://localhost:3000"

while ($true) {
    $move = Read-Host "Enter a move (or q to quit)"

    if ($move -in @("q", "quit")) {
        break
    }

    try {
        $body = @{ move = $move } | ConvertTo-Json -Compress

        Invoke-RestMethod `
            -Method Post `
            -Uri "$api/cube/moves" `
            -ContentType "application/json" `
            -Body $body | Out-Null

        $cube = Invoke-RestMethod "$api/cube"

        Write-Host "Cube after $move"
        $cube | ConvertTo-Json -Depth 10
    }
    catch {
        Write-Host "Request failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}
```

Cube reset (back to the solved cube state):

```powershell
Invoke-RestMethod -Method Post -Uri "$api/cube/reset"
```

Current cube status shown as whole faces serialized from each individual sticker: `http://localhost:3000/cube`.