#######################################################################################################################################      
####           ____                                                                                                                ####      
####          /---.'.__             ____//       尺🝗丂〸ㄖ尺🝗  乃闩⼕长ㄩ尸-丂⼕尺讠尸〸 by Eray                                      ####
####               '--.\           /.---'                                                                                          ####      
####          _______  \\         //                                                                                               ####      
####        /.------.\  \|      .'/  ______                                                                                        ####      
####       //  ___  \ \ ||/|\  //  _/_----.\__   Please read the script before executing                                           ####      
####      |/  /.-.\  \ \:|< >|// _/.'..\   '--'                                                                                    ####      
####         //   \'. | \'.|.'/ /_/ /  \\        This script restores the project and the mySQL Database                           ####      
####        //     \ \_\/" ' ~\-'.-'    \\                                                                                         ####      
####       //       '-._| :H: |'-.__     \\                                                                                        ####      
####      //           (/'==='\)'-._\     ||                                                                                       ####      
####     ||                        \\    \|      !!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!                                               ####      
####      ||                         \\    '     Be careful if you enter a wrong path you can delete important files               ####      
####      |/                          \\                                                                                           ####      
####                                   ||                                                                                          ####      
####                                   ||                                                                                          ####      
####                                   \\                                                                                          ####      
####                                    '                                                                                          ####      
#######################################################################################################################################      

################# Fill this variables #######################
# !!!! DON'T FORGET TO ADD THE BACKSLASH AT THE END OF THE PATH !!!!
# !!!! YOU CAN DELETE THE WHOLE PROJECTS FOLDER !!!!

# Path to the BackupFolder
pathToTheBackupFolder=""

# Path to the project
pathToTheProject=""

##### Enter database credentials #####
dbUserName=""
dbPassword=""
dbName=""

############################################################

# Get the backupName from the first parameter
backupName="$1"

# Check if the backupName is empty
if [ -z "$backupName" ]; then
    echo "error: Backup name is missing"
    exit 1
fi

# Concat the path to the backup folder and the backup name
pathToTheBackup="$pathToTheBackupFolder$backupName"

# Check if the backup exists
if [ ! -f "$pathToTheBackup" ]; then
    echo "error: Backup does not exist"
    exit 1
fi

# Try to connect to database and if it fails exit the script with an error message
if ! mysql -u "$dbUserName" -p"$dbPassword" -e "use $dbName" > /dev/null 2>&1; then
    echo "Db connection failed. Check database credentials"
    exit 1
fi

# Cd to backupFolder create a tmp directory and move into tmp directory
cd "$pathToTheBackupFolder" && mkdir tmp && cd tmp

# Unzip backup in tmp directory | > /dev/null is to not display the output of zip
unzip "$pathToTheBackup" > /dev/null

# Delete all files in the Project folder | DON'T PUT A SPACE BETWEEN pathToTheProject and the STAR !!!
# !!! YOU CAN DELETE IMPORTANT FOLDERS ON THE SERVER !!!
rm -rf "$pathToTheProject"*

# Move the content of the unzipped backup file to the project folder
mv "$pathToTheBackupFolder"tmp/content/* "$pathToTheProject"

# Fill Database with sql dump from backup
mysql -u "$dbUserName" -p"$dbPassword" "$dbName" < "$pathToTheBackupFolder"tmp/db/*.sql

# Delete tmp directory
rm -rf "$pathToTheBackupFolder"tmp


########## END ##########

echo "Backup was restored successfully"