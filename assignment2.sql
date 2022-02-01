CREATE TABLE dbo.Users
(
user_id int PRIMARY KEY,
email varchar(255),
name varchar(255),
password varchar(255),
avatar_url varchar(255),
status integer,
last_login datetime,
type integer
);

CREATE TABLE dbo.Devices
(
user_id int FOREIGN KEY REFERENCES Users(user_id),
type integer,
account_number varchar(255),
device_info varchar(255),
created  datetime,
status int,
device_id varchar(255) PRIMARY KEY,

);

INSERT INTO Users VALUES (1, 'henry@gmail.com', 'Henry', 'ISBN638242', 'demo_avatar_url_henry', 20,'20120618 10:34:09 AM',12);
INSERT INTO Users VALUES (2, 'henry1@gmail.com', 'Henry1', 'ISBN6382421', 'demo_avatar_url_henry1', 21,'20120517 10:34:09 AM',31);
INSERT INTO Users VALUES (3, 'henry2@gmail.com', 'Henry2', 'ISBN6382422', 'demo_avatar_url_henry2', 22,'20120819 10:34:09 AM',1);
INSERT INTO Users VALUES (4, 'henry3@gmail.com', 'Henry3', 'ISBN6382423', 'demo_avatar_url_henry3', 23,'20120110 10:34:09 AM',0);

GO

INSERT INTO dbo.Devices VALUES(4, 312,'30303','device_info','20220127 10:34:12 AM',11,'1');
INSERT INTO dbo.Devices VALUES(1, 3121,'303031','device_info1','20220128 10:34:12 AM',11,'2');
INSERT INTO dbo.Devices VALUES(2, 3122,'303032','device_info2','20220129 10:34:12 AM',11,'3');
INSERT INTO dbo.Devices VALUES(3, 3123,'303033','device_info3','20220131 10:34:12 AM',11,'4');
INSERT INTO dbo.Devices VALUES(4, 3124,'303034','device_info4','20220130 10:34:12 AM',11,'5');
INSERT INTO dbo.Devices VALUES(1, 3125,'303035','device_info5','20120110 10:34:12 AM',11,'6');


GO


/*1./ script to show who and what devices had been added in the last 7 days.*/
SELECT Users.user_id, Users.name, Users.email, Devices.device_info, Devices.status, Devices.device_id, Devices.created AS [Created day]
FROM Users
INNER JOIN Devices
ON Devices.user_id = Users.user_id
WHERE Devices.created >= DATEADD(day,-7, GETDATE());



/*2./ */
-- Insert some records with the same device_id
INSERT INTO dbo.Devices VALUES(1, 3125,'303035','device_info5','20120110 10:34:12 AM',11,'7');
INSERT INTO dbo.Devices VALUES(1, 3125,'303035','device_info5','20120110 10:34:12 AM',11,'8');
INSERT INTO dbo.Devices VALUES(3, 3123,'303033','device_info3','20220131 10:34:12 AM',11,'9');
INSERT INTO dbo.Devices VALUES(1, 3121,'303031','device_info1','20220128 10:34:12 AM',11,'10');
INSERT INTO dbo.Devices VALUES(null, 3121,'303031','device_info1','20220128 10:34:12 AM',11,'11');


-- Check duplicate records by using PARTITION BY, 
-- and in the output, if any row has the value of [DuplicateCount] column greater than 1, it shows that it is a duplicate row.
WITH Devices_CTE([Account Number], 
    [Device Info], 
    [Created],
	[Device Id],
    [Duplicate Count])
AS (SELECT [account_number], 
           [device_info], 
           [created], 
		   [device_id],
           ROW_NUMBER()OVER(PARTITION BY user_id,
										 type,
										 account_number,
										 device_info,
										 status 
			ORDER BY device_id) AS DuplicateCount
    FROM dbo.Devices)

SELECT * FROM Devices_CTE
WHERE [Duplicate Count] > 1;


-- removes the rows having the value of [DuplicateCount] greater than 1
WITH Devices_CTE([Account Number], 
    [Device Info], 
    [Created],
	[Device Id],
    DuplicateCount)
AS (SELECT [account_number], 
           [device_info], 
           [created], 
		   [device_id],
           ROW_NUMBER()OVER(PARTITION BY user_id,
										 type,
										 account_number,
										 device_info,
										 status 
			ORDER BY device_id) AS DuplicateCount
    FROM dbo.Devices)
DELETE FROM Devices_CTE
WHERE DuplicateCount > 1;