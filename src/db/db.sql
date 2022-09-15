CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_name varchar(64) not null,
    user_password text not null,
    profession_id int DEFAULT null,
    user_status varchar(32) DEFAULT 'student',
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

INSERT INTO users(user_name, user_password, user_status) VALUES('Mustafo', crypt('mustafo123', gen_salt('md5')), 'admin');
INSERT INTO users(user_name, user_password, profession_id, user_status) VALUES('Kozim', crypt('kozim123', gen_salt('md5')), 1,  'teacher');
INSERT INTO users(user_name, user_password, profession_id, user_status) VALUES('Mirkarim', crypt('mirkarim123', gen_salt('md5')), 2, 'teacher');
INSERT INTO users(user_name, user_password, profession_id, user_status) VALUES('Ahmad', crypt('ahmad123', gen_salt('md5')), 2, 'teacher');
INSERT INTO users(user_name, user_password, profession_id, user_status) VALUES('Baxtiyor', crypt('baxtiyor123', gen_salt('md5')), 2, 'teacher');

INSERT INTO users(user_name, user_password) VALUES('Mirshakar', crypt('mirshakar123', gen_salt('md5')));
INSERT INTO users(user_name, user_password) VALUES('Matkarim', crypt('matkarim123', gen_salt('md5')));
INSERT INTO users(user_name, user_password) VALUES('Jonibek', crypt('jonibek123', gen_salt('md5')));

CREATE TABLE archive(
    id serial not null PRIMARY KEY,
    user_id text not null,
    user_name varchar(64) not null,
    user_password text not null,
    user_status varchar(32),
    deleted_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE OR REPLACE FUNCTION delete_user_archive()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	
    INSERT INTO archive(user_id, user_name, user_password, user_status)
    VALUES(OLD.user_id, OLD.user_name, OLD.user_password, OLD.user_status);
    RETURN OLD;

END;
$$;


CREATE TRIGGER deleteFn
BEFORE DELETE
ON users
FOR EACH ROW
EXECUTE PROCEDURE delete_user_archive();



DROP TABLE IF EXISTS courses;

CREATE TABLE courses(
    course_id serial not null PRIMARY KEY,
    course_title varchar(255) not null,
    course_price varchar(255) not null,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);


INSERT INTO courses(course_title, course_price) VALUES('Web Daturlash backend', '1 000 000');
INSERT INTO courses(course_title, course_price) VALUES('Web Dasturlash Frontend', '800 000');
INSERT INTO courses(course_title, course_price) VALUES('SMM kurslari', '700 000');
INSERT INTO courses(course_title, course_price) VALUES('Grapic Designer kurslari', '600 000');
INSERT INTO courses(course_title, course_price) VALUES('Android Mobile dasturlash', '1 200 000');
INSERT INTO courses(course_title, course_price) VALUES('Sun`iy Intellekt', '1 500 000');
INSERT INTO courses(course_title, course_price) VALUES('Moution Grapic', '900 000');


DROP TABLE IF EXISTS groups;

CREATE TABLE groups(
    group_id serial not null PRIMARY KEY,
    group_name varchar(64) not null,
    courseid int not null,
        FOREIGN KEY(courseid)
        REFERENCES courses(course_id),
    teacher_id uuid,
        FOREIGN KEY(teacher_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp    
);





DROP TABLE IF EXISTS student_courses;

CREATE TABLE student_courses(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    student_id uuid,
        FOREIGN KEY(student_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    group_id int,
    FOREIGN KEY(group_id)
    REFERENCES groups(group_id)
    ON DELETE CASCADE
);



DROP TABLE IF EXISTS homeworks;

CREATE TABLE homeworks(
    id serial not null PRIMARY KEY,
    title varchar(255) not null,
    groupid int,
        FOREIGN KEY(groupid)
        REFERENCES groups(group_id)
        ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT current_timestamp    
);
          

