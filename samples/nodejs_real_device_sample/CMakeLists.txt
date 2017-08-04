#Copyright (c) Microsoft. All rights reserved.
#Licensed under the MIT license. See LICENSE file in the project root for full license information.

cmake_minimum_required(VERSION 2.8.12)

if(WIN32)
  set(nodejs_simple_sample_json
      ./src/gateway_sample_win.json )
else()
  set(nodejs_simple_sample_json
      ./src/gateway_sample_lin.json )
endif()

set(nodejs_real_device_sample_sources
  ./src/main.c
  ${nodejs_simple_sample_json}
)
set(nodejs_real_device_sample_headers
)

set_source_files_properties(${nodejs_simple_sample_json} PROPERTIES  HEADER_FILE_ONLY ON)

include_directories(
  ../../core/inc
  ${GW_INC}
)

set(LIBS ${LIBS} gateway)

add_executable(nodejs_real_device_sample ${nodejs_real_device_sample_headers} ${nodejs_real_device_sample_sources})
target_link_libraries(nodejs_real_device_sample ${LIBS})

# make nodejs_simple_sample depend on other modules
add_dependencies(nodejs_real_device_sample nodejs_binding logger)

linkSharedUtil(nodejs_real_device_sample)
install_broker(nodejs_real_device_sample ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )
copy_node_dll(nodejs_real_device_sample ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )
copy_gateway_dll(nodejs_real_device_sample ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )

add_sample_to_solution(nodejs_real_device_sample)
