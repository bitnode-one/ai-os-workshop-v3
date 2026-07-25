param(
  [int]$MinimumFreeDiskGB = 30,
  [int]$MinimumRAMGB = 16
)

$results = [System.Collections.Generic.List[object]]::new()

function Add-Check {
  param(
    [string]$Name,
    [string]$Value,
    [string]$Status,
    [string]$Recommendation
  )
  $results.Add([pscustomobject]@{
    Check = $Name
    Value = $Value
    Status = $Status
    Recommendation = $Recommendation
  })
}

$computer = Get-CimInstance Win32_ComputerSystem
$operatingSystem = Get-CimInstance Win32_OperatingSystem
$processor = Get-CimInstance Win32_Processor | Select-Object -First 1
$gpu = Get-CimInstance Win32_VideoController | Select-Object -First 1
$disk = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$ramGB = [math]::Round($computer.TotalPhysicalMemory / 1GB, 1)
$freeDiskGB = [math]::Round($disk.FreeSpace / 1GB, 1)

Add-Check "Computer" "$($computer.Manufacturer) $($computer.Model)" "INFO" "Auf dem tatsächlichen Präsentationsgerät ausführen."
Add-Check "Betriebssystem" "$($operatingSystem.Caption) $($operatingSystem.Version)" $(if ($operatingSystem.Caption -match "Windows 10|Windows 11") {"PASS"} else {"FAIL"}) "Windows 10 oder 11 verwenden."
Add-Check "CPU" $processor.Name "INFO" "Für LM Studio ist unter x64 AVX2 erforderlich."
Add-Check "RAM" "$ramGB GB" $(if ($ramGB -ge $MinimumRAMGB) {"PASS"} else {"FAIL"}) "Mindestens $MinimumRAMGB GB RAM."
Add-Check "GPU" "$($gpu.Name), gemeldeter AdapterRAM $([math]::Round($gpu.AdapterRAM / 1GB, 1)) GB" $(if ($gpu.AdapterRAM -ge 4GB) {"PASS"} else {"WARN"}) "LM Studio empfiehlt 4 GB dedizierten VRAM; integrierte GPUs verwenden zusätzlich gemeinsamen RAM."
Add-Check "Freier Speicher C:" "$freeDiskGB GB" $(if ($freeDiskGB -ge $MinimumFreeDiskGB) {"PASS"} else {"FAIL"}) "Mindestens $MinimumFreeDiskGB GB, besser 50 GB freigeben."

try {
  $nodeVersion = (& node --version).Trim()
  $nodeMajor = [int]($nodeVersion -replace "^v(\d+).*$", '$1')
  Add-Check "Node.js" $nodeVersion $(if ($nodeMajor -ge 18) {"PASS"} else {"FAIL"}) "Node.js 18 oder neuer installieren."
} catch {
  Add-Check "Node.js" "nicht gefunden" "FAIL" "Node.js 18 oder neuer installieren."
}

try {
  Add-Check "Git" ((& git --version).Trim()) "PASS" "Keine Aktion erforderlich."
} catch {
  Add-Check "Git" "nicht gefunden" "FAIL" "Git for Windows installieren."
}

try {
  $hermesCommand = (Get-Command hermes -ErrorAction Stop).Source
  $hermesVersion = (& hermes --version | Select-Object -First 1).Trim()
  Add-Check "Hermes" "$hermesVersion · $hermesCommand" "PASS" "Vor dem Workshop Anmeldung und Testchat prüfen."
} catch {
  Add-Check "Hermes" "nicht gefunden" "WARN" "Hermes Desktop direkt installieren."
}

$soulPath = Join-Path $env:LOCALAPPDATA "hermes\SOUL.md"
if (Test-Path -LiteralPath $soulPath) {
  try {
    $strictUtf8 = [System.Text.UTF8Encoding]::new($false, $true)
    $null = $strictUtf8.GetString([System.IO.File]::ReadAllBytes($soulPath))
    Add-Check "SOUL.md" "UTF-8" "PASS" "Keine Aktion erforderlich."
  } catch {
    Add-Check "SOUL.md" "nicht UTF-8" "FAIL" "Vorher sichern und als UTF-8 speichern; danach hermes doctor ausführen."
  }
} else {
  Add-Check "SOUL.md" "nicht gefunden" "WARN" "Hermes starten und die automatisch erzeugte SOUL.md prüfen."
}

$lmStudioCandidates = @(
  "$env:LOCALAPPDATA\Programs\LM Studio\LM Studio.exe",
  "$env:LOCALAPPDATA\LM Studio\LM Studio.exe",
  "$env:ProgramFiles\LM Studio\LM Studio.exe"
)
$lmStudio = $lmStudioCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if ($lmStudio) {
  Add-Check "LM Studio" $lmStudio "PASS" "Workshop-Modell herunterladen und lokalen Server testen."
} else {
  Add-Check "LM Studio" "nicht gefunden" "WARN" "LM Studio installieren."
}

$results | Format-Table -AutoSize -Wrap

$failures = $results | Where-Object Status -eq "FAIL"
if ($failures) {
  Write-Error "$($failures.Count) kritische Anforderung(en) nicht erfüllt."
  exit 1
}

Write-Host "Notebook erfüllt die kritischen Mindestanforderungen." -ForegroundColor Green
