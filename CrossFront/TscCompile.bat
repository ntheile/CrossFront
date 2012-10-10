"TypeScript is compiling as AMD using TscCompile.bat"
cd D:\Websites\CrossFront\CrossFront\js
tsc.exe app.ts --module AMD
cd models
tsc.exe MenuItem.ts --module AMD
cd ..
cd collections
tsc.exe Menu.ts --module AMD