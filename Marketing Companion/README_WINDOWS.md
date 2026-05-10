Windows Desktop - Development & Build Instructions
===============================================

Prerequisites (on a Windows machine):

- Visual Studio 2022 or newer with the "Desktop development with C++" workload installed. Ensure the following components are selected:
  - MSVC v143 - VS 2022 C++ x64/x86 build tools
  - Windows 10/11 SDK
  - CMake and Ninja (optional but recommended)
- Flutter installed and on PATH. Use the stable channel (the project was developed with Flutter 3.22.1).
- Git, PowerShell (or Windows Terminal), and necessary developer tools.

Quick setup steps:

1. Open PowerShell or Windows Terminal as a developer (with path to Flutter on PATH).

2. Enable Windows desktop support for Flutter (if not already):

```powershell
flutter config --enable-windows-desktop
flutter doctor
```

3. Get dependencies:

```powershell
flutter pub get
```

4. Run the app (debug mode):

```powershell
flutter run -d windows
```

5. Build a release installer / binary:

```powershell
flutter build windows --release

# The release executable will be under: build\windows\runner\Release
```

CI artifacts:

This repository includes a GitHub Actions workflow at `.github/workflows/windows-build.yml` that builds a Windows release on `windows-latest` and uploads `build/windows/runner/Release` as an artifact. To get a build artifact without a local Windows machine, trigger that workflow (push a commit or open a PR targeting `main`) and download the artifact from the workflow run.

Notes & troubleshooting:

- If you see errors about missing Visual Studio components, open the Visual Studio Installer and add the required C++ workloads.
- Ensure the correct Windows SDK (10+ or 11) is installed and selected.
- If you need a portable MSI or installer, consider packaging the `Release` folder with a small installer generator like Inno Setup.

CI trigger note: this file was touched to trigger the Windows build workflow for CI testing.
