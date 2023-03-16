#######################################################################################################################################
####           ____                                                                                                                ####
####          /---.'.__             ____//       乃闩⼕长ㄩ尸-丂⼕尺讠尸セ by Eray                                                   ####
####               '--.\           /.---'                                                                                          ####
####          _______  \\         //                                                                                               ####
####        /.------.\  \|      .'/  ______      This script is a template. The following values should be adjusted.               ####
####       //  ___  \ \ ||/|\  //  _/_----.\__                                                                                     ####
####      |/  /.-.\  \ \:|< >|// _/.'..\   '--'  - maxAmountOfBackups:                                                             ####
####         //   \'. | \'.|.'/ /_/ /  \\        - pathToTheProject:                                                               ####
####        //     \ \_\/" ' ~\-'.-'    \\       - pathToTheBackupFolder:                                                          ####
####       //       '-._| :H: |'-.__     \\      - moveToOldBackupsFolder:                                                         ####
####      //           (/'==='\)'-._\     ||     - pathToTheOldBackupsFolder:                                                      ####
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

############################################################






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
fileName=$(date +'%Y-%m-%d-%a-%Hh-%Mm-%Ss-Backup.zip')

# Cd to the Project create zip and move it to the backup folder | > /dev/null is to no display the output of zip
cd "$pathToTheProject" && zip -r "$fileName" . > /dev/null && mv "$fileName" "$pathToTheBackupFolder"


##### END #####
echo "Backup was succesfully created"