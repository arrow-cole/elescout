; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "XeroCentral2"
#define MyCoachName "XeroCoach2"
#define MyScoutName "XeroScout2"
#define MyAppVersion "2.0.9"
#define MyAppPublisher "ErrorCodeXero"
#define MyAppURL "https://www.xerosw.org/"
#define MyAppExeName "xeroscout2.exe"
#define MyScoutAppExeName "xeroscout2.exe"
#define MyAppSourceDir "c:\cygwin64\home\butch\tools\xeroscout2"

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{3ACB4507-4EAF-439F-9866-C968D5ECB198}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableProgramGroupPage=yes
LicenseFile={#MyAppSourceDir}\installer\LICENSE
; Remove the following line to run in administrative install mode (install for all users.)
PrivilegesRequired=lowest
OutputDir={#MyAppSourceDir}\installer
OutputBaseFilename=xeroscout-{#MyAppVersion}
Compression=lzma
SolidCompression=yes
WizardStyle=modern
ChangesAssociations=yes

[CustomMessages]
CreateDesktopIcon=Create desktop icons

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "{#MyAppSourceDir}\out\xeroscout2-win32-x64\*.*"; DestDir: "{app}"; Flags: ignoreversion 64bit recursesubdirs
Source: "{#MyAppSourceDir}\content\fields\*.*"; DestDir: "{app}\content\fields"; Flags: ignoreversion 64bit recursesubdirs
Source: "{#MyAppSourceDir}\content\images\*.*"; DestDir: "{app}\content\images"; Flags: ignoreversion 64bit recursesubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Parameters: ". central"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon ;Parameters: ". central"
Name: "{autoprograms}\{#MyCoachName}"; Filename: "{app}\{#MyAppExeName}"; Parameters: ". coach"
Name: "{autodesktop}\{#MyCoachName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon; Parameters: ". coach"
Name: "{autoprograms}\{#MyScoutName}"; Filename: "{app}\{#MyScoutAppExeName}";Parameters: ". scout"
Name: "{autodesktop}\{#MyScoutName}"; Filename: "{app}\{#MyScoutAppExeName}"; Tasks: desktopicon;Parameters: ". scout"

[Run]


