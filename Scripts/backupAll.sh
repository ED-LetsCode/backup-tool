#######################################################################################################################################  
####           ____                                                                                                                ####  
####          /---.'.__             ____//       乃闩⼕长ㄩ尸-丂⼕尺讠尸セ by Eray                                                   ####
####               '--.\           /.---'                                                                                          ####  
####          _______  \\         //                                                                                               ####  
####        /.------.\  \|      .'/  ______      Please read the script before executing                                           ####  
####       //  ___  \ \ ||/|\  //  _/_----.\__                                                                                     ####  
####      |/  /.-.\  \ \:|< >|// _/.'..\   '--'  This script creates a backup of the project and the mySQL Database                ####  
####         //   \'. | \'.|.'/ /_/ /  \\                                                                                          ####  
####        //     \ \_\/" ' ~\-'.-'    \\                                                                                         ####  
####       //       '-._| :H: |'-.__     \\                                                                                        ####  
####      //           (/'==='\)'-._\     ||                                                                                       ####  
####     ||                        \\    \|      The Backupfile filename looks like this => 2023-03-14-Di-11h-25m-08s-Backup.zip   ####  
####      ||                         \\    '                                                                                       ####  
####      |/                          \\         !!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!                                               ####  
####                                   ||        Be careful if you enter a wrong path you can delete important files               ####  
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

# Max amount of backup files in the folder
maxAmountOfBackups=9

# You must fill the variable moveToOldBackupsFolder with true or false
# true if you want to move backup in another folder
# false if you want to delete backup
moveToOldBackupsFolder=true              # <= ONLY true OR false

# If you want to move the backups to another folder when the maximum number of backups is reached, specify the path
# to the oldBackups folder and fill the variable
# If you want to delete the oldest Backup you can leave this field empty
pathToTheOldBackupsFolder=""

##### Enter database credentials #####
dbUserName=""
dbPassword=""
dbName=""

############################################################


# Try to connect to database and if it fails exit the script with an error message
if ! mysql -u "$dbUserName" -p"$dbPassword" -e "use $dbName" > /dev/null 2>&1; then
    echo "Db connection failed. Check database credentials"
    exit 1
fi

# Count the amount of backups in the backup folder
amountOfBackups=$(ls "$pathToTheBackupFolder" | wc -l)

# -2 because there are 2 files that are not Backups ./backup.sh ./restore.sh
amountOfBackups=$((amountOfBackups - 2))

# If the number of files exceeds the maxAmountOfBackups, delete the oldest file
if [ $amountOfBackups -gt $maxAmountOfBackups ]; then

    # Get the oldest file in the current directory, excluding restore.sh and backup.sh
    oldestFile=$(ls "$pathToTheBackupFolder" -1t | grep -v -E 'restore\.sh|backup\.sh' | tail -1)

    # If Backup should not be deleted then move to another folder else delete
    if [ "$moveToOldBackupsFolder" = true ]; then
        # Move the oldest file to the old backups folder
        mv "$pathToTheBackupFolder$oldestFile" "$pathToTheOldBackupsFolder$oldestFile"
    else
       # Delete the oldest file
       rm "$pathToTheBackupFolder$oldestFile"
    fi

fi

# Create fileName | looks like this => 2023-03-14-Di-11h-25m-08s-Backup.zip
fileName=$(date +'%Y-%m-%d-%a-%Hh-%Mm-%Ss-Backup')

# Create a tmp folder with the db and content folder
mkdir -p "$pathToTheBackupFolder"tmp/db "$pathToTheBackupFolder"tmp/content

# Copy the project to the tmp/content folder
cp -r "$pathToTheProject"* "$pathToTheBackupFolder"tmp/content/

# Create a mysql database dump and save it in the tmp/db folder
mysqldump -u "$dbUserName" -p"$dbPassword" --add-drop-table --disable-keys "$dbName" >  "$pathToTheBackupFolder"tmp/db/"$fileName".sql

# Cd to the tmp folder create zip and move it to the backup folder
cd "$pathToTheBackupFolder"tmp/

# Zip tmp folder > /dev/null is to not display the output of zip
zip -r "$fileName.zip" . > /dev/null

# Move the zip file to the backup folder
mv "$fileName.zip" "$pathToTheBackupFolder"

# Delete the tmp folder
rm -rf "$pathToTheBackupFolder"tmp

##### END #####
echo "Backup was succesfully created"