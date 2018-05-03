import React, { Component } from 'react'
import TpoCardText from './TpoCardText'

const activePlantProjectPerTPO = (userTpos,plantProjects,treeCountid) => 
{
//    treeCountid=31;
// console.log(treeCountid)
  let prev = plantProjects.map(arr => arr);
  let Featured="is_certified"
  const tpo_id=prev.find(value=>value.tpo_id===treeCountid).tpo_id;
  let result=  prev.filter((value) => value && value.tpo_id && value.tpo_id===tpo_id);
  let projects = []
  let cnt = 0
  result.map((value, index) => {
      if(value && value[Featured]) {
          if(cnt === 0) {
              name = 'item active'
            } 
            else {
                name = 'item'
            }
            cnt = cnt + 1
            projects.push(
                <TpoCardText  name={name} key={index} tponame={userTpos[value.tpo_id].name} cardtext={value} />
            )
        }
    })
return projects
}

export {
    activePlantProjectPerTPO
}
