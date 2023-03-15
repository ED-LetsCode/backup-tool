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
####       //       '-._| :H: |'-.__     \\      The Backupfile filename looks like this => 2023-03-14-Di-11h-25m-08s-Backup.zip   ####  
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

# Path to the BackupFolder
pathToTheBackupFolder=""

# Path to the project
pathToTheProject=""

# Max amount of backup files in the folder
maxAmountOfBackups=9

############################################################






# Count the amount of backups in the backup folder
amountOfBackups=$(ls "$pathToTheBackupFolder" | wc -l)

# -2 because there are 2 files that are not Backups ./backup.sh ./restore.sh
amountOfBackups=$((amountOfBackups - 2))

# If the number of files exceeds the maxAmountOfBackups, delete the oldest file
if [ $amountOfBackups -gt $maxAmountOfBackups ]; then

    # Get the oldest file in the current directory, excluding restore.sh and backup.sh
    oldestFile=$(ls "$pathToTheBackupFolder" -1t | grep -v -E 'restore\.sh|backup\.sh' | tail -1)

    # Delete the oldest file
    rm "$pathToTheBackupFolder/$oldestFile"
fi

# Create fileName | looks like this => 2023-03-14-Di-11h-25m-08s-Backup.zip
fileName=$(date +'%Y-%m-%d-%a-%Hh-%Mm-%Ss-Backup.zip')

# Cd to the Project create zip and move it to the backup folder | > /dev/null is to no display the output of zip
cd "$pathToTheProject" && zip -r "$fileName" . > /dev/null && mv "$fileName" "$pathToTheBackupFolder"


##### END #####
echo "Backup was succesfully created"