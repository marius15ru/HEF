/*using System;
using System.Data;

using MySql.Data;*/
using MySql.Data.MySqlClient;


class DBConnect
{
    private MySqlConnection connection;
    private string server;
    private string port;
    private string database;
    private string uid;
    private string password;

    //Constructor
    public DBConnect()
    {
        Initialize();
    }

    //Initialize values
    private void Initialize()
    {
        server = "37.205.39.209";
        port = "3306";
        database = "hefis_eftirlit";
        uid = "hefis_eftirlit";
        password = "Jupiter.2020";
        string connectionString;
        connectionString = "SERVER=" + server + ";" + "port=" + port +";" + "DATABASE=" + database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";";

        connection = new MySqlConnection(connectionString);
    }

    //open connection to database
    private bool OpenConnection()
    {
        try
        {
            connection.Open();
            return true;
        }
        catch (MySqlException ex)
        {
            //When handling errors, you can your application's response based
            //on the error number.
            //The two most common error numbers when connecting are as follows:
            //0: Cannot connect to server.
            //1045: Invalid user name and/or password.
            switch (ex.Number)
            {
                case 0:
                    //MessageBox.Show("Cannot connect to server");
                    break;

                case 1045:
                    //MessageBox.Show("Invalid username/password, please try again");
                    break;
            }
            return false;
        }
    }


    //Close connection
    private bool CloseConnection()
    {
        try
        {
            connection.Close();
            return true;
        }
        catch (MySqlException ex)
        {
            //MessageBox.Show(ex.Message);
            return false;
        }
    }

    //Insert statement
    public void Insert()
    {
    }

    //Update statement
    public void Update()
    {
    }

    //Delete statement
    public void Delete()
    {
    }

    //Select statement
    /*public List <string> [] Select()
    {
    }
    */
    //Count statement
    /*public int Count()
    {
    }
    */
    //Backup
    public void Backup()
    {
    }

    //Restore
    public void Restore()
    {
    }
}