mkdir HSB-INVENTORY
cd ./HSB-INVENTORY
git clone https://github.com/Sebastiamg/inventary-system-backend.git
cd ./inventary-system-backend
del /F /A .dev.env
touch .dev.env
echo # app config>> ./.dev.env
echo PORT=3000>> ./.dev.env
echo # db config>> ./.dev.env
echo USER_PORT=6000>> ./.dev.env
echo DB_PORT=5432>> ./.dev.env
echo DB_HOST=localhost>> ./.dev.env
echo DB_NAME=hsb>> ./.dev.env
echo DB_USER=hsb>> ./.dev.env
echo DB_PASSWORD=hsb>> ./.dev.env
echo # JWT config>> ./.dev.env
echo JWT_SECRET=SECRET1>> ./.dev.env
echo JWT_REFRESH_SECRET=SECRET2>> ./.dev.env
echo # front app>> ./.dev.env
echo FRONTEND_PORT=9000>> ./.dev.env
call ./"UPDATE APP.bat"
